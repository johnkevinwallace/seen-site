import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div
        className="mx-auto py-24"
        style={{ maxWidth: "672px", paddingLeft: "24px", paddingRight: "24px" }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none" }}
          className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors"
        >
          ← Home
        </Link>

        <h1 className="text-4xl font-bold tracking-tight mt-8 mb-2">
          Terms of Use
        </h1>
        <p className="text-stone-600 text-sm mb-10">
          Last updated: April 19, 2026
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Ownership
            </h2>
            <p className="text-stone-400 leading-relaxed">
              All content, branding, logo, and design on seenadvocacy.com are
              the original work of Seen Advocacy and protected by copyright law.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Logo &amp; Branding
            </h2>
            <p className="text-stone-400 leading-relaxed">
              The Seen Advocacy logo and brand name may not be used without
              written permission.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Content
            </h2>
            <p className="text-stone-400 leading-relaxed">
              Blog posts, stories, and other content are owned by Seen Advocacy
              (or their respective anonymous authors). Do not reproduce without
              permission.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Anonymous Stories
            </h2>
            <p className="text-stone-400 leading-relaxed">
              Stories shared through the &ldquo;Share Your Story&rdquo; feature
              are submitted anonymously. By submitting, you grant Seen Advocacy
              a non-exclusive license to publish your story. We do not collect
              personal information with submissions.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Disclaimer
            </h2>
            <p className="text-stone-400 leading-relaxed">
              This site is not a substitute for professional mental health care.
              Content is for informational purposes only.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Changes
            </h2>
            <p className="text-stone-400 leading-relaxed">
              We may update these terms at any time.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}