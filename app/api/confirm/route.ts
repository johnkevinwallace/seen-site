import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const resendKey = process.env.RESEND_API_KEY!;

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
    console.error("Confirm DB error:", error);
    return NextResponse.redirect(new URL("/?confirmed=error", req.url));
  }

  // Send welcome email
  const subscriberEmail = (data as { email: string }).email;

  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Seen <newsletter@seenadvocacy.com>",
        to: subscriberEmail,
        subject: "You're in.",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px; color: #e7e5e4; background: #0c0a09;">
            <p style="margin-bottom: 24px;">Hey,</p>

            <p style="margin-bottom: 24px;">Thanks for subscribing to Seen.</p>

            <p style="margin-bottom: 24px;">This isn't going to be a polished newsletter with clickbait subjects and growth hacks. It's going to be honest writing about mental health — the real kind. No clinical language. No motivational posters.</p>

            <p style="margin-bottom: 24px;">You'll hear from me when I have something worth saying. Not before.</p>

            <p style="margin-bottom: 24px;">In the meantime, if you're struggling right now:</p>

            <p style="margin-bottom: 8px;"><strong style="color: #fbbf24;">988</strong> — Call or text, 24/7</p>
            <p style="margin-bottom: 24px;"><strong style="color: #fbbf24;">Crisis Text Line</strong> — Text HOME to 741741</p>

            <p style="margin-bottom: 8px;">Take care of yourself.</p>

            <p style="margin-bottom: 0;">— John Kevin<br>Seen</p>
          </div>
        `,
      }),
    });

    const emailData = await emailRes.json();
    if (!emailRes.ok) {
      console.error("Welcome email error:", emailData);
    } else {
      console.log("Welcome email sent:", emailData);
    }
  } catch (err) {
    console.error("Welcome email exception:", err);
  }

  return NextResponse.redirect(new URL("/?confirmed=success", req.url));
}