"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    supabase
      .from("posts")
      .select("id, slug, title, excerpt, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data as Post[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
        >
          ← Home
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mt-8 mb-6">
          Blog
        </h1>

        <p className="text-stone-400 leading-loose mb-2">
          Honest writing about the real experience of<br />
          mental health recovery.
        </p>
        <p className="text-stone-400 leading-loose mb-2">
          No clinical language.
        </p>
        <p className="text-stone-400 leading-loose mb-2">
          No motivational posters.
        </p>
        <p className="text-stone-400 leading-loose mb-12">
          Just what it&apos;s actually like.
        </p>

        <div className="border-t border-stone-800 pt-8">
          {loading ? (
            <p className="text-stone-600 text-sm">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-stone-600 text-sm">No posts yet. The first one is coming.</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none" }}
                  className="block group"
                >
                  <h2 className="text-lg font-semibold text-stone-200 group-hover:text-amber-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-stone-500 text-sm leading-relaxed">{post.excerpt}</p>
                  )}
                  <p className="text-stone-700 text-xs mt-2">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}