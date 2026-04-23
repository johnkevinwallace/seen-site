import Link from "next/link";
import { createAnonClient } from "@/lib/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Seen",
  description: "Honest writing about the real experience of mental health recovery.",
};

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  created_at: string;
}

export default async function BlogPage() {
  const supabase = createAnonClient();
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const posts = (data as Post[]) ?? [];

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="mx-auto py-24 text-center" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
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

        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          Honest writing about the real experience<br />
          of mental health recovery.
        </p>
        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          No clinical language.
        </p>
        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          No motivational posters.
        </p>
        <p className="text-stone-400 leading-relaxed" style={{ marginBottom: "12px" }}>
          Just what it&apos;s actually like.
        </p>

        <div className="border-t border-stone-800 pt-8">
          {posts.length === 0 ? (
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
