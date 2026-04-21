"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Story {
  id: string;
  story: string;
  created_at: string;
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // Force top position on mount (helps mobile/webview scroll restoration edge cases)
  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTop();
    const raf = window.requestAnimationFrame(scrollTop);
    const t1 = window.setTimeout(scrollTop, 0);
    const t2 = window.setTimeout(scrollTop, 120);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    supabase
      .from("stories")
      .select("id, story, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setStories((data as Story[]) ?? []);
        setLoading(false);
      });
  }, []);

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

        <h1 className="text-4xl font-bold tracking-tight mt-8 mb-6">
          Stories
        </h1>

        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          Real stories from real people.
        </p>
        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          No names. No judgment. Just truth.
        </p>

        <div className="border-t border-stone-800 pt-8">
          {loading ? (
            <p className="text-stone-600 text-sm">Loading...</p>
          ) : stories.length === 0 ? (
            <p className="text-stone-600 text-sm">No stories yet. Be the first to share yours.</p>
          ) : (
            <div className="space-y-8">
              {stories.map((s) => {
                const date = new Date(s.created_at);
                const month = date.toLocaleString("en-US", { month: "long" });
                const year = date.getFullYear();
                return (
                  <div key={s.id}>
                    <p style={{ color: "var(--text, #a8a29e)", lineHeight: "1.625", whiteSpace: "pre-wrap", fontSize: "14px" }}>
                      {s.story}
                    </p>
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
          <Link
            href="/share"
            scroll
            className="text-amber-400 text-sm hover:text-amber-300 transition-colors"
          >
            Share your own story →
          </Link>
        </div>
      </div>
    </div>
  );
}