import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  const { story } = await req.json();

  if (!story || story.trim().length < 10) {
    return NextResponse.json({ error: "Story must be at least 10 characters" }, { status: 400 });
  }

  if (story.length > 5000) {
    return NextResponse.json({ error: "Story must be under 5000 characters" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { error } = await supabase.from("stories").insert({ story: story.trim() });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}