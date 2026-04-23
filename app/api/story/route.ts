import { NextRequest, NextResponse } from "next/server";
import { createAnonClient } from "@/lib/supabase";

// --- Rate limiting (in-memory, per-IP, 3/hour) ---
const submissionTimes = new Map<string, number[]>();
const HOUR_MS = 60 * 60 * 1000;
const MAX_PER_HOUR = 3;

function pruneOld(ip: string, now: number) {
  const times = submissionTimes.get(ip);
  if (!times) return;
  const recent = times.filter((t) => now - t < HOUR_MS);
  if (recent.length === 0) {
    submissionTimes.delete(ip);
  } else {
    submissionTimes.set(ip, recent);
  }
}

// Periodic full cleanup every 10 minutes
let lastCleanup = Date.now();
function cleanupStale() {
  const now = Date.now();
  if (now - lastCleanup < 10 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, times] of submissionTimes) {
    const recent = times.filter((t) => now - t < HOUR_MS);
    if (recent.length === 0) {
      submissionTimes.delete(ip);
    } else {
      submissionTimes.set(ip, recent);
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { story, website } = body;

  // Honeypot: if filled, silently accept (tell bot it worked)
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!story || story.trim().length < 10) {
    return NextResponse.json({ error: "Story must be at least 10 characters" }, { status: 400 });
  }

  if (story.length > 5000) {
    return NextResponse.json({ error: "Story must be under 5000 characters" }, { status: 400 });
  }

  // Rate limit check
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  cleanupStale();
  pruneOld(ip, now);

  const times = submissionTimes.get(ip) || [];
  if (times.length >= MAX_PER_HOUR) {
    return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
  }

  const supabase = createAnonClient();
  const { error } = await supabase.from("stories").insert({ story: story.trim() });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Record submission time for rate limiting
  times.push(now);
  submissionTimes.set(ip, times);

  return NextResponse.json({ ok: true });
}