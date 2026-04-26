"use client";

import Link from "next/link";
import { useState } from "react";
import { detectTriggerWarnings } from "@/lib/story-warnings";

interface Story {
  id: string;
  story: string;
  created_at: string;
  trigger_warnings?: string[] | null;
}

interface StoriesClientProps {
  stories: Story[];
}

export default function StoriesClient({ stories }: StoriesClientProps) {
  const [revealedStories, setRevealedStories] = useState<Record<string, boolean>>({});

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

        <h1 className="text-4xl font-bold tracking-tight mt-8 mb-6">Stories</h1>

        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          Real stories from real people.
        </p>
        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          No names. No judgment. Just truth.
        </p>

        <div className="border-t border-stone-800 pt-8">
          {stories.length === 0 ? (
            <p className="text-stone-600 text-sm">No stories yet. Be the first to share yours.</p>
          ) : (
            <div className="space-y-8">
              {stories.map((s) => {
                const date = new Date(s.created_at);
                const month = date.toLocaleString("en-US", { month: "long" });
                const year = date.getFullYear();
                const warnings =
                  s.trigger_warnings && s.trigger_warnings.length > 0
                    ? s.trigger_warnings
                    : detectTriggerWarnings(s.story);
                const hasWarnings = warnings.length > 0;
                const isRevealed = revealedStories[s.id] || !hasWarnings;

                return (
                  <div key={s.id}>
                    {hasWarnings && (
                      <p className="text-amber-300 text-xs mb-3">
                        Trigger warning: {warnings.join(", ")}
                      </p>
                    )}
                    <div
                      style={{
                        position: "relative",
                        maxHeight: "420px",
                        overflowY: "auto",
                        padding: "16px 20px",
                        borderRadius: "8px",
                        background: "var(--bg, #0c0a09)",
                        border: "1px solid var(--border, #292524)",
                      }}
                    >
                      <p
                        style={{
                          color: "var(--text, #a8a29e)",
                          lineHeight: "1.625",
                          whiteSpace: "pre-wrap",
                          fontSize: "14px",
                          filter: hasWarnings && !isRevealed ? "blur(9px)" : "none",
                          transition: "filter 0.2s ease",
                          userSelect: hasWarnings && !isRevealed ? "none" : "text",
                        }}
                        aria-hidden={hasWarnings && !isRevealed}
                      >
                        {s.story}
                      </p>

                      {hasWarnings && !isRevealed && (
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedStories((prev) => ({
                              ...prev,
                              [s.id]: true,
                            }))
                          }
                          className="seen-btn"
                          style={{
                            position: "absolute",
                            inset: "50% auto auto 50%",
                            transform: "translate(-50%, -50%)",
                            width: "auto",
                            padding: "10px 16px",
                            fontSize: "12px",
                          }}
                        >
                          Tap to reveal
                        </button>
                      )}
                    </div>

                    <p style={{ color: "#78716c", fontSize: "12px", marginTop: "12px" }}>
                      Shared {month} {year}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-stone-800 pt-8 mt-8">
          <Link href="/share" scroll className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
            Share your own story →
          </Link>
        </div>
      </div>
    </div>
  );
}
