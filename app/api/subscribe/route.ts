import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// --- Rate limiting (in-memory, per-IP, 5/hour) ---
const subscribeAttempts = new Map<string, number[]>();
const HOUR_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 5;

function pruneOld(ip: string, now: number) {
  const times = subscribeAttempts.get(ip);
  if (!times) return;
  const recent = times.filter((t) => now - t < HOUR_MS);
  if (recent.length === 0) {
    subscribeAttempts.delete(ip);
  } else {
    subscribeAttempts.set(ip, recent);
  }
}

let lastCleanup = Date.now();
function cleanupStale() {
  const now = Date.now();
  if (now - lastCleanup < 10 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, times] of subscribeAttempts) {
    const recent = times.filter((t) => now - t < HOUR_MS);
    if (recent.length === 0) {
      subscribeAttempts.delete(ip);
    } else {
      subscribeAttempts.set(ip, recent);
    }
  }
}

export async function POST(req: NextRequest) {
  // Rate limit check
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  cleanupStale();
  pruneOld(ip, now);

  const times = subscribeAttempts.get(ip) || [];
  if (times.length >= MAX_PER_HOUR) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Generate a confirmation token
  const token = crypto.randomUUID();

  // Insert subscriber with confirmed=false and token
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { error } = await supabase.from("subscribers").upsert(
    { email, confirmed: false, confirm_token: token },
    { onConflict: "email" }
  );

  if (error) {
    // If already subscribed and confirmed, just return success
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, message: "Already subscribed" });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send confirmation email via Resend
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seenadvocacy.com";
  const confirmUrl = `${baseUrl}/api/confirm?token=${token}`;
  const resendKey = process.env.RESEND_API_KEY!;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Seen <hello@seenadvocacy.com>",
      to: email,
      subject: "Confirm your subscription",
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #d6d3d1;">
          <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 24px;">Confirm your subscription</h2>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Someone (hopefully you) signed up for updates from <strong>Seen</strong>. Click below to confirm your email address.
          </p>
          <a href="${confirmUrl}" style="display: inline-block; background: #fbbf24; color: #0c0a09; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Confirm subscription
          </a>
          <p style="font-size: 13px; color: #78716c; margin-top: 24px;">
            If you didn't sign up, you can safely ignore this email.
          </p>
        </div>
      `,
    }),
  });

  // Record successful request for rate limiting
  times.push(now);
  subscribeAttempts.set(ip, times);

  return NextResponse.json({ ok: true, message: "Confirmation email sent" });
}