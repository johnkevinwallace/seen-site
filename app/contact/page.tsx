"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div
        className="mx-auto py-24"
        style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
        >
          ← Home
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mt-8 mb-2">
          Report a Bug
        </h1>
        <p className="text-stone-600 text-sm mb-10">
          Found something broken? Let us know. No email required.
        </p>

        {status === "success" ? (
          <div className="text-stone-400">
            <p className="text-amber-400 text-lg font-semibold mb-2">Thanks for the report!</p>
            <p>We&apos;ll look into it.</p>
            <Link
              href="/"
              className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors mt-8 inline-block"
            >
              ← Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-stone-400 text-sm mb-1">Name <span className="text-stone-600">(optional)</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-stone-400 text-sm mb-1">Email <span className="text-stone-600">(optional)</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-stone-400 text-sm mb-1">Message <span className="text-amber-400">*</span></label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-y"
                placeholder="What went wrong?"
              />
            </div>
            {status === "error" && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === "sending" || !message.trim()}
              className="bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-lg text-sm hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Send Report"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}