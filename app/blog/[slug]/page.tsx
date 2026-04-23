import Link from "next/link";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { createAnonClient } from "@/lib/supabase";
import { Metadata } from "next";

interface Post {
  title: string;
  body: string;
  created_at: string;
  trigger_warning: string | null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createAnonClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  return {
    title: post?.title ? `${post.title} — Seen` : "Post not found — Seen",
    description: post?.excerpt || "Blog post from Seen",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createAnonClient();
  const { data: post } = await supabase
    .from("posts")
    .select("id, slug, title, body, trigger_warning, created_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

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

  const typedPost = post as Post;
  const rawHtml = marked.parse(typedPost.body || "", { breaks: true, gfm: true, async: false }) as string;
  const bodyHtml = sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "br", "hr", "img", "details", "summary"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      a: ["href", "title", "target", "rel"],
    },
    allowedSchemes: ["https", "mailto"],
  });

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
          {typedPost.title}
        </h1>

        <p className="text-stone-600 text-xs" style={{ marginBottom: "12px" }}>
          {new Date(typedPost.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {typedPost.trigger_warning && (
          <p className="text-stone-600 text-sm" style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#fbbf24" }}>Trigger Warning:</strong> {typedPost.trigger_warning}
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

        <div className="border-t border-stone-800 mt-12 pt-8">
          <p className="text-stone-600 text-xs uppercase tracking-[0.2em] mb-4">
            If you&apos;re struggling right now, you don&apos;t have to do it alone. Reach out:
          </p>
          <div className="text-left space-y-1">
            <p className="text-stone-500 text-sm">
              <strong className="text-stone-300">988 Suicide &amp; Crisis Lifeline</strong> — Call or text 988 (24/7)
            </p>
            <p className="text-stone-500 text-sm">
              <strong className="text-stone-300">Crisis Text Line</strong> — Text HOME to 741741 (24/7)
            </p>
            <p className="text-stone-500 text-sm">
              <strong className="text-stone-300">NAMI Helpline</strong> — 1-800-950-NAMI (Mon–Fri, 10am–10pm ET)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
