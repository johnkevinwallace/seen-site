import Link from "next/link";

export const metadata = {
  title: "Blog — Seen",
  description: "Honest writing about the real experience of mental health recovery.",
};

export default function BlogPage() {
  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <Link href="/" className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors">
          ← Home
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mt-8 mb-4">
          Blog
        </h1>
        <p className="text-stone-400 leading-relaxed mb-12">
          Honest writing about the real experience of mental health recovery. No clinical language. No motivational posters. Just what it&apos;s actually like.
        </p>

        <div className="border-t border-stone-800 pt-8">
          <p className="text-stone-600 text-sm">No posts yet. The first one is coming.</p>
        </div>
      </div>
    </div>
  );
}