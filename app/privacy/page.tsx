import Link from "next/link";

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-stone-600 text-sm mb-10">
          Last updated: April 2026
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              What We Collect
            </h2>
            <p className="text-stone-400 leading-relaxed">
              We collect the story text you submit and submission timestamp. We do
              not require your name or email for story submissions.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              How Stories Are Stored
            </h2>
            <p className="text-stone-400 leading-relaxed">
              Stories are stored in a secure database record intended to contain
              only story content and moderation fields. We do not intentionally
              attach name or email data to published stories.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Review Process
            </h2>
            <p className="text-stone-400 leading-relaxed">
              All stories are reviewed before publishing. We reserve the right
              not to publish content that promotes harm, contains hate speech,
              offers medical advice, or is spam.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Your Control
            </h2>
            <p className="text-stone-400 leading-relaxed">
              You cannot edit or delete a story after submission since we have
              no way to verify you submitted it. If you need a story removed,
              please <Link href="/contact" className="text-amber-400 hover:text-amber-300 transition-colors">contact us</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Third Parties
            </h2>
            <p className="text-stone-400 leading-relaxed">
              We use third-party infrastructure providers (for hosting, database,
              and delivery). They may process technical request data (for example,
              IP address, user agent, and security logs) to operate and secure the
              service. We do not sell your story data.
            </p>
          </div>

          <div>
            <h2 className="text-amber-400 text-lg font-semibold mb-2">
              Security
            </h2>
            <p className="text-stone-400 leading-relaxed">
              The site uses HTTPS encryption. Submissions are transmitted
              securely. The dedicated /share page does not load site analytics.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}