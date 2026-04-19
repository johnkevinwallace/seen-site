import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes } from "crypto";

// In production, this would be an env var. For now, it's server-side only.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "seen-admin-2026";
const SESSION_SECRET = process.env.SESSION_SECRET || randomBytes(32).toString("hex");

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSession(): string {
  // Create a signed token with timestamp
  const timestamp = Date.now();
  const payload = `${timestamp}:${randomBytes(16).toString("hex")}`;
  const signature = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}:${signature}`;
}

export function verifySession(token: string): boolean {
  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [timestamp, , signature] = parts;
  const payload = `${timestamp}:${parts[1]}`;
  const expectedSignature = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");

  if (signature !== expectedSignature) return false;

  // Session expires after 24 hours
  const sessionAge = Date.now() - parseInt(timestamp, 10);
  if (sessionAge > 24 * 60 * 60 * 1000) return false;

  return true;
}