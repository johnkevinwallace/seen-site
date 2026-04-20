import { NextRequest, NextResponse } from "next/server";

// --- Rate limiting (in-memory, per-IP, 5/hour) ---
const contactAttempts = new Map<string, number[]>();
const HOUR_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 5;

function pruneOld(ip: string, now: number) {
  const times = contactAttempts.get(ip);
  if (!times) return;
  const recent = times.filter((t) => now - t < HOUR_MS);
  if (recent.length === 0) {
    contactAttempts.delete(ip);
  } else {
    contactAttempts.set(ip, recent);
  }
}

let lastCleanup = Date.now();
function cleanupStale() {
  const now = Date.now();
  if (now - lastCleanup < 10 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, times] of contactAttempts) {
    const recent = times.filter((t) => now - t < HOUR_MS);
    if (recent.length === 0) {
      contactAttempts.delete(ip);
    } else {
      contactAttempts.set(ip, recent);
    }
  }
}

export async function POST(req: NextRequest) {
  // Rate limit check
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  cleanupStale();
  pruneOld(ip, now);

  const times = contactAttempts.get(ip) || [];
  if (times.length >= MAX_PER_HOUR) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const { name, email, message } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const htmlBody = `
    <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #d6d3d1;">
      <h2 style="color: #fbbf24; font-size: 20px; margin-bottom: 24px;">Bug Report</h2>
      <table style="width: 100%; font-size: 14px; line-height: 1.8;">
        <tr><td style="color: #78716c; width: 80px; vertical-align: top;">Name:</td><td>${name ? escapeHtml(name) : "<em>Not provided</em>"}</td></tr>
        <tr><td style="color: #78716c; vertical-align: top;">Email:</td><td>${email ? escapeHtml(email) : "<em>Not provided</em>"}</td></tr>
        <tr><td style="color: #78716c; vertical-align: top;">Message:</td><td>${escapeHtml(message).replace(/\n/g, "<br/>")}</td></tr>
      </table>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Seen <hello@seenadvocacy.com>",
      to: "johnkevin.q.wallace@gmail.com",
      subject: "Bug Report from seenadvocacy.com",
      html: htmlBody,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send report" }, { status: 500 });
  }

  // Record successful request for rate limiting
  times.push(now);
  contactAttempts.set(ip, times);

  return NextResponse.json({ ok: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}