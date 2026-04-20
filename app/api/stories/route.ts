import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySession } from "@/lib/auth";

/*
 * Supabase Migration — run this in the SQL editor:
 *
 * ALTER TABLE stories ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
 *
 * Existing rows will default to 'pending'. New submissions from the site
 * already insert without a status, so they'll also default to 'pending'.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getAdminClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// GET /api/stories — fetch pending stories for admin review
export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;
  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getAdminClient();

  // Fetch stories where status is 'pending' or null (pre-migration rows)
  const { data, error } = await supabase
    .from("stories")
    .select("id, story, created_at, status, featured")
    .or("status.eq.pending,status.is.null")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ stories: data });
}

// PATCH /api/stories — update story status (publish)
export async function PATCH(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;
  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const supabase = getAdminClient();

  const { error } = await supabase
    .from("stories")
    .update({ status })
    .eq("id", id);

  if (error) {
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

  const supabase = getAdminClient();

  const { error } = await supabase
    .from("stories")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}