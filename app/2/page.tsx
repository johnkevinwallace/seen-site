"use client";

import Link from "next/link";

/**
 * Design 2: "Card Wall / Bento Grid"
 * Mosaic/bento grid of cards. Feels like a digital mood board — dense, tiled, modular.
 * Each content piece is a self-contained card in an asymmetric grid.
 */

const resources = [
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988 — 24/7, free, confidential" },
  { name: "Crisis Text Line", detail: "Text HOME to 741741 — 24/7, free, confidential" },
  { name: "NAMI Helpline", detail: "1-800-950-NAMI (6264) — Mon–Fri, 10am–10pm ET" },
  { name: "SAMHSA Helpline", detail: "1-800-662-4357 — 24/7, free, confidential" },
];

export default function Design2() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 md:p-8">
      {/* Top bar */}
      <nav className="flex items-center justify-between mb-6">
        <Link href="/" className="text-stone-600 text-xs uppercase tracking-[0.2em] hover:text-amber-400 transition-colors">← Home</Link>
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-600">Design Exploration 2</span>
      </nav>

      {/* Bento grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(180px,auto)]">

        {/* Hero — spans full width */}
        <div className="col-span-2 md:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-8 md:p-16 flex flex-col justify-center" aria-label="Hero">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            Everyone deserves to be <span className="italic text-amber-400">seen</span>.
          </h1>
          <p className="text-stone-400 mt-6 text-lg leading-relaxed max-w-lg">
            Too many people struggle in silence — with mental health, with setbacks, with the feeling that no one notices.
          </p>
        </div>

        {/* Mission — tall card */}
        <div className="col-span-2 md:col-span-2 md:row-span-2 bg-amber-400/10 border border-amber-400/20 rounded-2xl p-8 flex flex-col justify-between" aria-label="Mission">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Mission</p>
            <p className="text-2xl md:text-3xl font-bold leading-snug text-stone-100">
              Help those struggling with their mental health to be seen.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Vision</p>
            <p className="text-lg font-light leading-snug text-stone-300">
              Become a prominent voice in the mental health advocacy space.
            </p>
          </div>
        </div>

        {/* Values — small card */}
        <div className="col-span-1 bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col justify-center" aria-label="Values">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-3">Values</p>
          <p className="text-lg font-bold text-stone-200">Compassion.</p>
          <p className="text-lg font-bold text-stone-200">Respect.</p>
          <p className="text-lg font-bold text-stone-200">Support.</p>
        </div>

        {/* John — portrait card */}
        <div className="col-span-1 bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center" aria-label="About">
          <img
            src="/john-v2.jpg"
            alt="John Kevin"
            width={80}
            height={80}
            className="rounded-full object-cover mb-3 border border-stone-700"
          />
          <p className="text-stone-300 text-sm font-bold">John Kevin</p>
          <p className="text-stone-600 text-[10px] uppercase tracking-[0.15em] mt-1">Lived experience. Real advocacy.</p>
        </div>

        {/* Why — wide card */}
        <div className="col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-8" aria-label="Why This Matters">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 mb-4">Why This Matters</p>
          <div className="space-y-3 text-stone-400 text-sm leading-relaxed">
            <p>I live it. ADHD. Bipolar 1.</p>
            <p>The cycle of starting strong, crashing hard, and rebuilding from scratch.</p>
            <p className="text-stone-200 font-medium">Being seen — truly seen, not judged, not fixed, just acknowledged — is where recovery starts.</p>
          </div>
        </div>

        {/* Coming — stacked small cards */}
        <div className="col-span-1 bg-stone-900 border border-stone-800 rounded-2xl p-6" aria-label="Coming Soon">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Coming</p>
          <p className="text-stone-300 text-sm leading-relaxed">→ Tools for building stability</p>
        </div>
        <div className="col-span-1 bg-stone-900 border border-stone-800 rounded-2xl p-6" aria-label="Coming Soon">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Coming</p>
          <p className="text-stone-300 text-sm leading-relaxed">→ Honest writing about recovery</p>
        </div>

        {/* Community card */}
        <div className="col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-6" aria-label="Community">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4">Coming</p>
          <p className="text-stone-300 text-sm leading-relaxed">→ A community where people support each other without judgment</p>
        </div>

        {/* Resources — full width */}
        <div className="col-span-2 md:col-span-4 bg-stone-900/50 border border-stone-800 rounded-2xl p-8" aria-label="Resources">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 mb-6">If you need help now</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {resources.map((r) => (
              <div key={r.name}>
                <p className="text-amber-400 font-bold text-sm">{r.name}</p>
                <p className="text-stone-500 text-xs italic mt-1">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="col-span-2 md:col-span-4 text-center py-4">
          <p className="text-stone-700 text-[10px]">This site is not a substitute for professional mental health care.</p>
          <p className="text-stone-700 text-[10px]">The stories shared here are personal experiences and do not constitute medical advice.</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-stone-600">
            <Link href="/terms" className="hover:text-stone-400">Terms of Use</Link>
            <span className="text-stone-700">·</span>
            <Link href="/privacy" className="hover:text-stone-400">Privacy Policy</Link>
            <span className="text-stone-700">·</span>
            <Link href="/contact" className="hover:text-stone-400">Report a Bug</Link>
          </div>
          <p className="text-stone-700 text-[11px] mt-2">© 2026 Seen Advocacy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}