import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Story Notices — Seen",
  description: "What happens when you share your story on Seen.",
};

export default function StoryNoticesPage() {
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

        <h1 className="text-3xl font-bold tracking-tight mt-8 mb-6">Story Notices</h1>
        <p className="text-stone-400 text-sm leading-relaxed mb-8">
          What you should know before sharing your story on Seen.
        </p>

        <div className="space-y-6 text-stone-400 text-sm leading-relaxed">
          <div>
            <h2 className="text-amber-400 text-xs uppercase tracking-[0.2em] mb-2">Privacy</h2>
            <p className="mb-2">We don&apos;t ask for your name or email when you submit a story. Every story is published anonymously.</p>
            <p>Infrastructure providers may process technical request metadata (like IP address and browser details) for abuse prevention and site operations.</p>
          </div>

          <div>
            <h2 className="text-amber-400 text-xs uppercase tracking-[0.2em] mb-2">Review</h2>
            <p>Every story is reviewed before publication. Nothing is posted instantly.</p>
          </div>

          <div>
            <h2 className="text-amber-400 text-xs uppercase tracking-[0.2em] mb-2">Drafts</h2>
            <p>Drafts are saved locally in this browser while you type. If you close the page and come back, your text will still be there.</p>
          </div>

          <div>
            <h2 className="text-amber-400 text-xs uppercase tracking-[0.2em] mb-2">Withdrawal</h2>
            <p>If you want to withdraw a submission before publication, use <Link href="/contact" className="hover:text-amber-400 transition-colors">contact</Link> and include your submission time and first sentence so we can find it.</p>
          </div>

          <div>
            <h2 className="text-amber-400 text-xs uppercase tracking-[0.2em] mb-2">Analytics</h2>
            <p>The dedicated /share page does not load analytics.</p>
          </div>

          <div>
            <h2 className="text-amber-400 text-xs uppercase tracking-[0.2em] mb-2">Legal</h2>
            <p>
              <Link href="/privacy" className="text-stone-500 hover:text-amber-400 transition-colors">
                See our privacy policy →
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-12">
          <a
            href="/share"
            className="seen-btn inline-block text-center"
            style={{ textDecoration: "none", width: "auto", paddingLeft: "24px", paddingRight: "24px" }}
          >
            Back to Share
          </a>
        </div>
      </div>
    </div>
  );
}
