"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<{ title: string; body: string; created_at: string; trigger_warning: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    supabase
      .from("posts")
      .select("id, slug, title, body, trigger_warning, created_at")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data }) => {
        setPost(data as typeof post);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100 flex items-center justify-center">
        <p className="text-stone-600 text-sm">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link
            href="/blog"
            style={{ textDecoration: "none" }}
            className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  // Split on blank lines (one or more) for paragraph breaks
  // Single newlines within a paragraph stay as line breaks
  const blocks = post.body
    .split(/\n\n+/)
    .filter((b: string) => b.trim())
    .map((b: string) => b.trim());

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <Link
          href="/blog"
          style={{ textDecoration: "none" }}
          className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
        >
          ← Blog
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-8 mb-4">
          {post.title}
        </h1>

        <p className="text-stone-600 text-xs mb-12">
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {post.trigger_warning && (
          <p className="text-stone-600 text-sm" style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#fbbf24" }}>Trigger Warning:</strong> {post.trigger_warning}
          </p>
        )}

        <div className="text-stone-400 leading-relaxed text-left">
          {blocks.map((block: string, i: number) => (
            <p key={i} className="mb-12 break-words" style={{ whiteSpace: "pre-line", overflowWrap: "anywhere" }}>
              {block}
            </p>
          ))}
        </div>

        <div className="border-t border-stone-800 mt-16 pt-8">
          <Link
            href="/blog"
            style={{ textDecoration: "none" }}
            className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
          >
            ← Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}