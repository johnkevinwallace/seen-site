import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/?confirmed=error", req.url));
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await supabase
    .from("subscribers")
    .update({ confirmed: true, confirm_token: null })
    .eq("confirm_token", token)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.redirect(new URL("/?confirmed=error", req.url));
  }

  return NextResponse.redirect(new URL("/?confirmed=success", req.url));
}