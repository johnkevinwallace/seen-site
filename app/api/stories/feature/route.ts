import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { verifySession } from "@/lib/auth";

// PATCH /api/stories/feature — toggle featured status on a story
export async function PATCH(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session")?.value;
  if (!sessionToken || !verifySession(sessionToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, featured } = await req.json();

  if (!id || typeof featured !== "boolean") {
    return NextResponse.json({ error: "id and featured (boolean) required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("stories")
    .update({ featured })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}