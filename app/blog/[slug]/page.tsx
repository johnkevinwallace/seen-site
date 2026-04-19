"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { marked } from "marked";


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

  const bodyHtml = useMemo(() => {
    if (!post?.body) return "";
    const result = marked.parse(post.body, { breaks: true, gfm: true, async: false });
    return typeof result === "string" ? result : "";
  }, [post?.body]);

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

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="mx-auto py-24 text-center" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
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

        <p className="text-stone-600 text-xs" style={{ marginBottom: "12px" }}>
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

        <div
          className="text-left blog-post-body"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

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
      <style jsx global>{`
        .blog-post-body p {
          color: #a8a29e;
          line-height: 1.625;
          margin-bottom: 12px;
          overflow-wrap: anywhere;
        }
        .blog-post-body h2 {
          color: #fbbf24;
          font-weight: 700;
          font-size: 1.125rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }
        .blog-post-body h3 {
          color: rgba(251, 191, 36, 0.8);
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 12px;
        }
        .blog-post-body strong {
          color: #f5f5f4;
        }
        .blog-post-body a {
          color: #fbbf24;
          text-decoration: none;
        }
        .blog-post-body em {
          color: #d6d3d1;
          font-style: italic;
        }
        .blog-post-body u {
          color: #d6d3d1;
          text-decoration: underline;
        }
        .blog-post-body a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}