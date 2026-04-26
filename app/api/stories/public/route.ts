import { NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase";

// GET /api/stories/public — fetch published stories for public display
export async function GET() {
  const supabase = createAnonClient();

  const withWarnings = await supabase
    .from("stories")
    .select("id, story, created_at, featured, trigger_warnings")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (!withWarnings.error) {
    return NextResponse.json({ stories: withWarnings.data ?? [] });
  }

  const fallback = await supabase
    .from("stories")
    .select("id, story, created_at, featured")
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
