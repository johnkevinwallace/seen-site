import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifySession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;

  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, slug, excerpt, body, trigger_warning } = await req.json();

  if (!title || !body) {
    return NextResponse.json({ error: "Title and body required" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Upsert: update if slug exists, insert if new
  const { data: existing } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .single();

  let error;
  if (existing) {
    ({ error } = await supabase
      .from("posts")
      .update({
        title,
        excerpt: excerpt || null,
        trigger_warning: trigger_warning || null,
        body,
        published: true,
      })
      .eq("slug", slug));
  } else {
    ({ error } = await supabase.from("posts").insert({
      title,
      slug,
      excerpt: excerpt || null,
      trigger_warning: trigger_warning || null,
      body,
      published: true,
    }));
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}