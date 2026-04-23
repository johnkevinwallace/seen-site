import { NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase";

// GET /api/stories/public — fetch published stories for public display
export async function GET() {
  const supabase = createAnonClient();

  const { data, error } = await supabase
    .from("stories")
    .select("story, created_at, featured")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ stories: data });
}