import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createSession } from "@/lib/auth";

// --- Rate limiting (in-memory, per-IP, 5/15min) ---
const authAttempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function pruneOld(ip: string, now: number) {
  const times = authAttempts.get(ip);
  if (!times) return;
  const recent = times.filter((t) => now - t < WINDOW_MS);
  if (recent.length === 0) {
    authAttempts.delete(ip);
  } else {
    authAttempts.set(ip, recent);
  }
}

let lastCleanup = Date.now();
function cleanupStale() {
  const now = Date.now();
  if (now - lastCleanup < 10 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, times] of authAttempts) {
    const recent = times.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) {
      authAttempts.delete(ip);
    } else {
      authAttempts.set(ip, recent);
    }
  }
}

export async function POST(req: NextRequest) {
  // Rate limit check
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  cleanupStale();
  pruneOld(ip, now);

  const times = authAttempts.get(ip) || [];
  if (times.length >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  // Record attempt before checking password
  times.push(now);
  authAttempts.set(ip, times);

  const { password } = await req.json();

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = createSession();

  const response = NextResponse.json({ success: true, token });

  // Set HttpOnly cookie so JS can't access it
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}