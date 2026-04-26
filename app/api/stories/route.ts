import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";
import { normalizeTriggerWarnings } from "@/lib/story-warnings";

/*
 * Supabase migrations — run in SQL editor if needed:
 *
 * ALTER TABLE stories ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
 * ALTER TABLE stories ADD COLUMN IF NOT EXISTS trigger_warnings TEXT[] DEFAULT '{}';
 */

// GET /api/stories — fetch pending stories for admin review
export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;
  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const withWarnings = await supabase
    .from("stories")
    .select("id, story, created_at, status, featured, trigger_warnings")
    .or("status.eq.pending,status.is.null")
    .order("created_at", { ascending: false });

  if (!withWarnings.error) {
    return NextResponse.json({ stories: withWarnings.data ?? [] });
  }

  // Backward-compatible fallback if trigger_warnings column does not exist yet
  const fallback = await supabase
    .from("stories")
    .select("id, story, created_at, status, featured")
    .or("status.eq.pending,status.is.null")
    .order("created_at", { ascending: false });

  if (fallback.error) {
    return NextResponse.json({ error: fallback.error.message }, { status: 500 });
  }

  const stories = (fallback.data ?? []).map((story) => ({
    ...story,
    trigger_warnings: null,
  }));

  return NextResponse.json({ stories });
}

// PATCH /api/stories — publish story and/or update trigger warnings
export async function PATCH(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;
  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status, trigger_warnings } = await req.json();

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};

  if (typeof status === "string" && status.trim().length > 0) {
    updates.status = status.trim();
  }

  if (typeof trigger_warnings !== "undefined") {
    updates.trigger_warnings = normalizeTriggerWarnings(trigger_warnings);
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("stories")
    .update(updates)
    .eq("id", id);

  if (error) {
    if (String(error.message).toLowerCase().includes("trigger_warnings")) {
      return NextResponse.json(
        {
          error:
            "Database missing trigger_warnings column. Run: ALTER TABLE stories ADD COLUMN IF NOT EXISTS trigger_warnings TEXT[] DEFAULT '{}';",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/stories — delete a story by id
export async function DELETE(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;
  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("stories").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
