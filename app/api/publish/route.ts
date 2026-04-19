import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const { title, slug, excerpt, body, password } = await req.json();

  // Server-side password check
  if (password !== "seen-admin-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!title || !body) {
    return NextResponse.json({ error: "Title and body required" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { error } = await supabase.from("posts").insert({
    title,
    slug,
    excerpt: excerpt || null,
    body,
    published: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}