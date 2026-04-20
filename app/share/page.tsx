"use client";

import { useState } from "react";
import Link from "next/link";

export default function SharePage() {
  const [storyText, setStoryText] = useState("");
  const [storyStatus, setStoryStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [website, setWebsite] = useState(""); // honeypot

  const handleStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText || storyText.trim().length < 10) return;
    setStoryStatus("loading");
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story: storyText.trim(), website }),
      });
      if (res.ok) {
        setStoryStatus("success");
      } else {
        setStoryStatus("error");
      }
    } catch {
      setStoryStatus("error");
    }
    setStoryText("");
  };

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="mx-auto py-24" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
        >
          ← Home
        </Link>

        <h1 className="text-sm uppercase tracking-[0.2em] text-amber-400 mt-8 mb-4">
          Share Your Story
        </h1>

        <p className="text-stone-400 text-sm leading-relaxed mb-4">Your story matters. Share it here — completely anonymous. No email, no name, no cookies, no tracking. Just your words. We never collect or store any identifying information.</p>
        <p className="text-stone-600 text-xs leading-relaxed mb-2">Stories are reviewed before publishing. We welcome honest, respectful accounts of mental health experiences. Content that promotes harm, contains hate speech, or offers medical advice will not be published.</p>
        <p className="mb-8"><a href="/privacy" className="text-stone-600 text-xs hover:text-amber-400 transition-colors">See our privacy policy →</a></p>

        {storyStatus === "success" ? (
          <p className="text-amber-400">Thank you. Your story has been received.</p>
        ) : (
          <form onSubmit={handleStory} className="flex flex-col gap-4">
            <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <textarea
              required
              minLength={10}
              maxLength={5000}
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="Write your story here..."
              rows={6}
              className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50 resize-none"
            />
            <button
              type="submit"
              disabled={storyStatus === "loading" || storyText.trim().length < 10}
              className="w-full px-4 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              {storyStatus === "loading" ? "..." : "Submit anonymously"}
            </button>
          </form>
        )}
        {storyStatus === "error" && (
          <p className="text-red-400 text-xs mt-2">Something went wrong. Try again?</p>
        )}

        <div className="border-t border-stone-800 pt-8 mt-12">
          <Link
            href="/stories"
            className="text-amber-400 text-sm hover:text-amber-300 transition-colors"
          >
            ← Back to Stories
          </Link>
        </div>
      </div>
    </div>
  );
}