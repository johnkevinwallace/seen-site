import { createHmac, timingSafeEqual, randomBytes } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "";

if (!ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD is required");
}

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required");
}

export function verifyPassword(password: string): boolean {
  const provided = Buffer.from(password);
  const expected = Buffer.from(ADMIN_PASSWORD);
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
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