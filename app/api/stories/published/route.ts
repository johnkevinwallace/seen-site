import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";

// GET /api/stories/published — fetch published stories for admin management
export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;
  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const withWarnings = await supabase
    .from("stories")
    .select("id, story, created_at, status, featured, trigger_warnings")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (!withWarnings.error) {
    return NextResponse.json({ stories: withWarnings.data ?? [] });
  }

  const fallback = await supabase
    .from("stories")
    .select("id, story, created_at, status, featured")
    .eq("status", "published")
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
