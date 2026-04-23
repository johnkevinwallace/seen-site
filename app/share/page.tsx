"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SharePage() {
  const [storyText, setStoryText] = useState("");
  const [storyStatus, setStoryStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [website, setWebsite] = useState(""); // honeypot

  // Force top position on mount (helps mobile/webview scroll restoration edge cases)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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

        <p className="text-stone-400 text-sm leading-relaxed mb-3">Your story matters. We don&apos;t ask for your name or email.</p>
        <p className="text-stone-600 text-xs leading-relaxed mb-3">We store your story text and submission time, and every story is reviewed before publishing.</p>
        <p className="text-stone-600 text-xs leading-relaxed mb-3">Infrastructure providers may process technical request metadata (like IP address and browser details) for abuse prevention and site operations.</p>
        <p className="text-stone-600 text-xs leading-relaxed mb-3">The dedicated /share page does not load analytics.</p>
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
              className="seen-textarea"
            />
            <button
              type="submit"
              disabled={storyStatus === "loading" || storyText.trim().length < 10}
              className="seen-btn"
            >
              {storyStatus === "loading" ? "..." : "Submit anonymously"}
            </button>
          </form>
        )}
        <div aria-live="polite" className="sr-only">
          {storyStatus === "error" && "Something went wrong. Try again?"}
        </div>
        {storyStatus === "error" && (
          <p className="text-red-400 text-xs mt-2" aria-live="polite">Something went wrong. Try again?</p>
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
