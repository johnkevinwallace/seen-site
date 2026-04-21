"use client";

import Link from "next/link";

/**
 * Design 3: "Mono Scroll — Swiss/International Style"
 * Ultra-clean Swiss design. Full-bleed sections, massive type, strict grid alignment.
 * Reductive, geometric, systematic. Each section is a full viewport band.
 */

const resources = [
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988 — 24/7, free, confidential" },
  { name: "Crisis Text Line", detail: "Text HOME to 741741 — 24/7, free, confidential" },
  { name: "NAMI Helpline", detail: "1-800-950-NAMI (6264) — Mon–Fri, 10am–10pm ET" },
  { name: "SAMHSA Helpline", detail: "1-800-662-4357 — 24/7, free, confidential" },
];

export default function Design3() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Fixed nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-sm border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors">← Home</Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-600">Design Exploration 3</span>
        </div>
      </nav>

      {/* Hero — full bleed, massive type, left-aligned */}
      <section className="min-h-screen flex items-end pb-24 px-6 md:px-16 pt-16" aria-label="Hero">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-6">Seen Advocacy</p>
          <h1 className="text-5xl sm:text-7xl md:text-[10rem] font-bold tracking-[-0.04em] leading-[0.85]">
            Everyone<br />deserves to<br />be <span className="text-amber-400">seen</span>.
          </h1>
          <p className="mt-12 text-stone-500 text-lg max-w-md leading-relaxed">
            Too many people struggle in silence. This is a space that notices.
          </p>
        </div>
      </section>

      {/* Mission — split layout, text on right */}
      <section className="min-h-screen flex items-center border-t border-stone-800 px-6 md:px-16 py-24" aria-label="Mission">
        <div className="max-w-7xl mx-auto w-full md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600">01</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mt-2">Mission</p>
          </div>
          <div className="md:col-span-9 mt-8 md:mt-0">
            <p className="text-3xl md:text-5xl font-light leading-snug text-stone-200">
              Help those struggling with their mental health to be seen.
            </p>
          </div>
        </div>
      </section>

      {/* Vision — inverted split */}
      <section className="min-h-screen flex items-center border-t border-stone-800 px-6 md:px-16 py-24" aria-label="Vision">
        <div className="max-w-7xl mx-auto w-full md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-9 md:order-2">
            <p className="text-3xl md:text-5xl font-light leading-snug text-stone-200">
              Become a prominent voice in the mental health advocacy space.
            </p>
          </div>
          <div className="md:col-span-3 md:order-1 mt-8 md:mt-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600">02</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mt-2">Vision</p>
          </div>
        </div>
      </section>

      {/* Values — horizontal list */}
      <section className="min-h-screen flex items-center border-t border-stone-800 px-6 md:px-16 py-24" aria-label="Values">
        <div className="max-w-7xl mx-auto w-full">
          <div className="md:grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600">03</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mt-2">Values</p>
            </div>
            <div className="md:col-span-9 mt-8 md:mt-0 flex gap-12 md:gap-24">
              <p className="text-4xl md:text-6xl font-bold text-stone-200">Compassion</p>
              <p className="text-4xl md:text-6xl font-bold text-stone-200">Respect</p>
              <p className="text-4xl md:text-6xl font-bold text-stone-200">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why — paragraph grid */}
      <section className="min-h-screen flex items-center border-t border-stone-800 px-6 md:px-16 py-24" aria-label="Why This Matters">
        <div className="max-w-7xl mx-auto w-full md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600">04</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mt-2">Why This Matters</p>
          </div>
          <div className="md:col-span-9 mt-8 md:mt-0 md:columns-2 md:gap-12">
            <p className="text-stone-400 leading-loose text-lg mb-4">I live it. ADHD. Bipolar 1. The cycle of starting strong, crashing hard, and rebuilding from scratch.</p>
            <p className="text-stone-400 leading-loose text-lg mb-4">The comparison trap — watching everyone else move forward while you&apos;re just trying to stand up.</p>
            <p className="text-stone-300 leading-loose text-lg font-medium mb-4">Being seen — truly seen, not judged, not fixed, just acknowledged — is where recovery starts.</p>
            <p className="text-stone-400 leading-loose text-lg">This isn&apos;t about having all the answers. It&apos;s about making sure no one has to struggle alone in the dark.</p>
          </div>
        </div>
      </section>

      {/* What's Coming — numbered list */}
      <section className="min-h-screen flex items-center border-t border-stone-800 px-6 md:px-16 py-24" aria-label="What's Coming">
        <div className="max-w-7xl mx-auto w-full md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600">05</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mt-2">What&apos;s Coming</p>
          </div>
          <div className="md:col-span-9 mt-8 md:mt-0 space-y-8">
            <div className="flex gap-6 items-start">
              <p className="text-amber-400 text-3xl font-bold shrink-0">01</p>
              <p className="text-stone-300 text-xl leading-relaxed">Tools and systems for building stability when motivation fails</p>
            </div>
            <div className="flex gap-6 items-start">
              <p className="text-amber-400 text-3xl font-bold shrink-0">02</p>
              <p className="text-stone-300 text-xl leading-relaxed">Honest writing about the real experience of mental health recovery</p>
            </div>
            <div className="flex gap-6 items-start">
              <p className="text-amber-400 text-3xl font-bold shrink-0">03</p>
              <p className="text-stone-300 text-xl leading-relaxed">A community where people support each other without judgment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="border-t border-stone-800 px-6 md:px-16 py-24" aria-label="Resources">
        <div className="max-w-7xl mx-auto w-full md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600">06</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mt-2">Help Now</p>
          </div>
          <div className="md:col-span-9 mt-8 md:mt-0 space-y-6">
            {resources.map((r) => (
              <div key={r.name} className="border-t border-stone-800 pt-4">
                <p className="text-amber-400 font-bold text-sm">{r.name}</p>
                <p className="text-stone-500 text-xs italic mt-1">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-700 text-[10px]">This site is not a substitute for professional mental health care.</p>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-600">
            <Link href="/terms" className="hover:text-stone-400">Terms of Use</Link>
            <span className="text-stone-700">·</span>
            <Link href="/privacy" className="hover:text-stone-400">Privacy Policy</Link>
            <span className="text-stone-700">·</span>
            <Link href="/contact" className="hover:text-stone-400">Report a Bug</Link>
          </div>
          <p className="text-stone-700 text-[11px] mt-4">© 2026 Seen Advocacy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}