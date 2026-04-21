"use client";

import Link from "next/link";

/**
 * Design 4: "Split Screen / Dual Panel"
 * Persistent left panel (branding/nav) + scrolling right panel (content).
 * Feels like a documentation site or brand showcase — fixed identity, flowing content.
 */

const resources = [
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988 — 24/7, free, confidential" },
  { name: "Crisis Text Line", detail: "Text HOME to 741741 — 24/7, free, confidential" },
  { name: "NAMI Helpline", detail: "1-800-950-NAMI (6264) — Mon–Fri, 10am–10pm ET" },
  { name: "SAMHSA Helpline", detail: "1-800-662-4357 — 24/7, free, confidential" },
];

export default function Design4() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 md:flex">
      {/* Left panel — fixed on desktop */}
      <aside className="hidden md:flex md:flex-col md:w-[45%] md:h-screen md:sticky md:top-0 md:border-r md:border-stone-800 bg-stone-950 p-12 justify-between" aria-label="Brand panel">
        <div>
          <Link href="/" className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors">← Home</Link>
          <div className="mt-16">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[0.9]">
              Everyone<br />deserves to<br />be <span className="italic text-amber-400">seen</span>.
            </h1>
            <p className="mt-8 text-stone-500 leading-relaxed max-w-sm">
              Too many people struggle in silence — with mental health, with setbacks, with the feeling that no one notices. This is a space that notices.
            </p>
          </div>
        </div>
        <div>
          <img
            src="/john-v2.jpg"
            alt="John Kevin"
            width={64}
            height={64}
            className="rounded-full object-cover border border-stone-700 mb-3"
          />
          <p className="text-stone-300 text-sm font-bold">John Kevin</p>
          <p className="text-stone-600 text-[10px] uppercase tracking-[0.15em] mt-1">Lived experience. Real advocacy.</p>
          <p className="text-stone-700 text-[10px] mt-6">© 2026 Seen Advocacy</p>
        </div>
      </aside>

      {/* Mobile hero (shown only on mobile) */}
      <div className="md:hidden p-6 border-b border-stone-800">
        <Link href="/" className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors">← Home</Link>
        <h1 className="text-3xl font-bold tracking-tight leading-[0.9] mt-6">
          Everyone deserves to be <span className="italic text-amber-400">seen</span>.
        </h1>
      </div>

      {/* Right panel — scrolling content */}
      <main className="md:w-[55%] bg-stone-900/30">
        <article className="max-w-xl mx-auto px-6 md:px-12 py-12 md:py-24 space-y-20 md:space-y-32">

          {/* Mission */}
          <section aria-label="Mission">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Mission</p>
            <p className="text-3xl font-light leading-snug text-stone-200">
              Help those struggling with their mental health to be seen.
            </p>
          </section>

          {/* Vision */}
          <section aria-label="Vision">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Vision</p>
            <p className="text-3xl font-light leading-snug text-stone-200">
              Become a prominent voice in the mental health advocacy space.
            </p>
          </section>

          {/* Values */}
          <section aria-label="Values">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Values</p>
            <div className="space-y-4">
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
                <p className="text-xl font-bold text-stone-200">Compassion</p>
              </div>
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
                <p className="text-xl font-bold text-stone-200">Respect</p>
              </div>
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
                <p className="text-xl font-bold text-stone-200">Support</p>
              </div>
            </div>
          </section>

          {/* Why */}
          <section aria-label="Why This Matters">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 mb-6">Why This Matters</p>
            <div className="space-y-4 text-stone-400 leading-relaxed">
              <p>I live it. ADHD. Bipolar 1.</p>
              <p>The cycle of starting strong, crashing hard, and rebuilding from scratch.</p>
              <p>The comparison trap — watching everyone else move forward while you&apos;re just trying to stand up.</p>
              <p>I don&apos;t have a degree in psychology. I&apos;m not a therapist.</p>
              <p className="text-stone-200 font-medium text-lg">Being seen — truly seen, not judged, not fixed, just acknowledged — is where recovery starts.</p>
              <p>This isn&apos;t about having all the answers. It&apos;s about making sure no one has to struggle alone in the dark.</p>
            </div>
          </section>

          {/* What's Coming */}
          <section aria-label="What's Coming">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 mb-6">What&apos;s Coming</p>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="text-amber-400 text-xl mt-0.5">→</span>
                <p className="text-stone-300 leading-relaxed">Tools and systems for building stability when motivation fails</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-amber-400 text-xl mt-0.5">→</span>
                <p className="text-stone-300 leading-relaxed">Honest writing about the real experience of mental health recovery</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-amber-400 text-xl mt-0.5">→</span>
                <p className="text-stone-300 leading-relaxed">A community where people support each other without judgment</p>
              </li>
            </ul>
          </section>

          {/* Resources */}
          <section aria-label="Resources">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 mb-6">If you need help now</p>
            <div className="space-y-4">
              {resources.map((r) => (
                <div key={r.name} className="bg-stone-900 border border-stone-800 rounded-xl p-5">
                  <p className="text-amber-400 font-bold text-sm">{r.name}</p>
                  <p className="text-stone-500 text-xs italic mt-1">{r.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-stone-800 pt-8">
            <p className="text-stone-700 text-[10px]">This site is not a substitute for professional mental health care.</p>
            <p className="text-stone-700 text-[10px]">The stories shared here are personal experiences and do not constitute medical advice.</p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-600">
              <Link href="/terms" className="hover:text-stone-400">Terms of Use</Link>
              <span className="text-stone-700">·</span>
              <Link href="/privacy" className="hover:text-stone-400">Privacy Policy</Link>
              <span className="text-stone-700">·</span>
              <Link href="/contact" className="hover:text-stone-400">Report a Bug</Link>
            </div>
            <p className="text-stone-700 text-[11px] mt-4">© 2026 Seen Advocacy. All rights reserved.</p>
          </footer>
        </article>
      </main>
    </div>
  );
}