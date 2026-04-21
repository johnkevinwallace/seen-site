"use client";

import Link from "next/link";

/**
 * Design 1: "Editorial Broadsheet"
 * Magazine/newspaper editorial layout. Dense, text-forward, asymmetric columns.
 * Feels like opening a broadsheet newspaper — big display type, multi-column body, pull-quotes.
 */

const resources = [
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988 — 24/7, free, confidential" },
  { name: "Crisis Text Line", detail: "Text HOME to 741741 — 24/7, free, confidential" },
  { name: "NAMI Helpline", detail: "1-800-950-NAMI (6264) — Mon–Fri, 10am–10pm ET" },
  { name: "SAMHSA Helpline", detail: "1-800-662-4357 — 24/7, free, confidential" },
];

export default function Design1() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Masthead */}
      <header className="border-b border-stone-800 py-6 px-6 md:px-12">
        <nav className="flex items-baseline justify-between max-w-6xl mx-auto">
          <Link href="/" className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors">← Home</Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-600">Design Exploration 1</span>
        </nav>
      </header>

      {/* Lead Story — Full-width headline */}
      <section className="border-b border-stone-800 px-6 md:px-12 py-20 md:py-32 max-w-6xl mx-auto" aria-label="Hero">
        <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-6">Lead Story</p>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
          Everyone<br />deserves to<br />be <span className="italic text-amber-400">seen</span>.
        </h1>
        <p className="text-stone-400 text-lg md:text-xl leading-relaxed max-w-xl">
          Too many people struggle in silence — with mental health, with setbacks, with the feeling that no one notices. This is a space that notices.
        </p>
      </section>

      {/* Two-column editorial spread */}
      <section className="border-b border-stone-800 px-6 md:px-12 py-16 md:py-24" aria-label="Mission and Vision">
        <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-16">
          {/* Left column */}
          <div className="md:border-r border-stone-800 md:pr-16 mb-12 md:mb-0">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">Mission</p>
            <p className="text-2xl md:text-3xl font-light leading-snug text-stone-200 mb-12">
              Help those struggling with their mental health to be seen.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">Vision</p>
            <p className="text-2xl md:text-3xl font-light leading-snug text-stone-200">
              Become a prominent voice in the mental health advocacy space.
            </p>
          </div>
          {/* Right column */}
          <div className="md:pl-16">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-6">Values</p>
            <div className="space-y-6">
              <div className="border-t border-stone-800 pt-4">
                <p className="text-3xl font-bold text-amber-400">01</p>
                <p className="text-xl text-stone-200 mt-1">Compassion</p>
              </div>
              <div className="border-t border-stone-800 pt-4">
                <p className="text-3xl font-bold text-amber-400">02</p>
                <p className="text-xl text-stone-200 mt-1">Respect</p>
              </div>
              <div className="border-t border-stone-800 pt-4">
                <p className="text-3xl font-bold text-amber-400">03</p>
                <p className="text-xl text-stone-200 mt-1">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pull-quote section */}
      <section className="border-b border-stone-800 px-6 md:px-12 py-20 md:py-28" aria-label="Why This Matters">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-600 mb-8">Why This Matters</p>
          <blockquote className="text-3xl md:text-5xl font-light leading-snug text-stone-300 max-w-3xl border-l-4 border-amber-400 pl-8 md:pl-12">
            I know what it&apos;s like to fight your own brain and still show up the next day.
          </blockquote>
          <div className="mt-12 md:mt-16 max-w-2xl space-y-4 text-stone-400 leading-relaxed">
            <p>I live it. ADHD. Bipolar 1.</p>
            <p>The cycle of starting strong, crashing hard, and rebuilding from scratch.</p>
            <p>The comparison trap — watching everyone else move forward while you&apos;re just trying to stand up.</p>
            <p>I don&apos;t have a degree in psychology. I&apos;m not a therapist.</p>
            <p>Being seen — truly seen, not judged, not fixed, just acknowledged — is where recovery starts.</p>
            <p>This isn&apos;t about having all the answers. It&apos;s about making sure no one has to struggle alone in the dark.</p>
          </div>
        </div>
      </section>

      {/* What's Coming — Three-column grid */}
      <section className="border-b border-stone-800 px-6 md:px-12 py-16 md:py-24" aria-label="What's Coming">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-600 mb-12">What&apos;s Coming</p>
          <div className="md:grid md:grid-cols-3 md:gap-8 space-y-8 md:space-y-0">
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-8">
              <p className="text-amber-400 text-4xl font-bold mb-4">→</p>
              <p className="text-stone-200 leading-relaxed">Tools and systems for building stability when motivation fails</p>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-8">
              <p className="text-amber-400 text-4xl font-bold mb-4">→</p>
              <p className="text-stone-200 leading-relaxed">Honest writing about the real experience of mental health recovery</p>
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-lg p-8">
              <p className="text-amber-400 text-4xl font-bold mb-4">→</p>
              <p className="text-stone-200 leading-relaxed">A community where people support each other without judgment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources — Dense listing */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-stone-800" aria-label="Resources">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-600 mb-8">If you need help now</p>
          <div className="space-y-6">
            {resources.map((r) => (
              <div key={r.name} className="md:flex md:items-baseline md:gap-8 border-t border-stone-800 pt-4">
                <p className="text-amber-400 font-bold text-sm md:w-64 shrink-0">{r.name}</p>
                <p className="text-stone-400 text-xs italic">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <p className="text-stone-600 text-[10px]">This site is not a substitute for professional mental health care.</p>
        <p className="text-stone-600 text-[10px]">The stories shared here are personal experiences and do not constitute medical advice.</p>
        <div className="mt-6 flex items-center gap-2 text-[11px] text-stone-600">
          <Link href="/terms" className="hover:text-stone-400">Terms of Use</Link>
          <span className="text-stone-700">·</span>
          <Link href="/privacy" className="hover:text-stone-400">Privacy Policy</Link>
          <span className="text-stone-700">·</span>
          <Link href="/contact" className="hover:text-stone-400">Report a Bug</Link>
        </div>
        <p className="text-stone-700 text-[11px] mt-4">© 2026 Seen Advocacy. All rights reserved.</p>
      </footer>
    </div>
  );
}