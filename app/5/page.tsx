"use client";

import Link from "next/link";

/**
 * Design 5: "Vertical Film Strip — Cinematic Scroll"
 * Each section is a dramatic full-viewport "scene" with oversized type, high contrast, and cinematic pacing.
 * Feels like scrolling through film title cards. Vertical rhythm is everything.
 * Heavy use of vertical spacing, centered type, and minimal UI chrome.
 */

const resources = [
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988 — 24/7, free, confidential" },
  { name: "Crisis Text Line", detail: "Text HOME to 741741 — 24/7, free, confidential" },
  { name: "NAMI Helpline", detail: "1-800-950-NAMI (6264) — Mon–Fri, 10am–10pm ET" },
  { name: "SAMHSA Helpline", detail: "1-800-662-4357 — 24/7, free, confidential" },
];

export default function Design5() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Minimal floating nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-sm border border-stone-800 rounded-full px-6 py-2">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-stone-500 text-xs uppercase tracking-[0.15em] hover:text-amber-400 transition-colors">Home</Link>
          <span className="w-px h-3 bg-stone-700" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-stone-600">Exploration 5</span>
        </div>
      </nav>

      {/* Scene 1: Hero — towering type */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6" aria-label="Hero">
        <div>
          <p className="text-amber-400 text-[10px] uppercase tracking-[0.5em] mb-12">Seen Advocacy</p>
          <h1 className="text-6xl sm:text-8xl md:text-[12rem] font-bold tracking-[-0.05em] leading-[0.8]">
            SEEN
          </h1>
          <p className="mt-12 text-stone-400 text-xl md:text-2xl max-w-lg mx-auto leading-relaxed">
            Everyone deserves to be.
          </p>
        </div>
      </section>

      {/* Scene 2: Mission — single dramatic line */}
      <section className="h-screen flex items-center justify-center text-center px-6 border-t border-stone-800/50" aria-label="Mission">
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.5em] text-amber-400 mb-8">Mission</p>
          <p className="text-4xl md:text-7xl font-light leading-tight text-stone-200">
            Help those struggling with their mental health to be <span className="text-amber-400 font-bold italic">seen</span>.
          </p>
        </div>
      </section>

      {/* Scene 3: Vision + Values — layered */}
      <section className="h-screen flex items-center justify-center text-center px-6 border-t border-stone-800/50" aria-label="Vision and Values">
        <div>
          <p className="text-[10px] uppercase tracking-[0.5em] text-amber-400 mb-8">Vision</p>
          <p className="text-3xl md:text-5xl font-light text-stone-300 max-w-2xl mx-auto leading-snug">
            Become a prominent voice in the mental health advocacy space.
          </p>
          <div className="mt-20 flex items-center justify-center gap-8 md:gap-16">
            <p className="text-2xl md:text-4xl font-bold text-stone-200">Compassion</p>
            <span className="text-stone-700 text-2xl">·</span>
            <p className="text-2xl md:text-4xl font-bold text-stone-200">Respect</p>
            <span className="text-stone-700 text-2xl">·</span>
            <p className="text-2xl md:text-4xl font-bold text-stone-200">Support</p>
          </div>
        </div>
      </section>

      {/* Scene 4: Why — stacked line-by-line reveal feel */}
      <section className="min-h-screen flex items-center justify-center text-center px-6 border-t border-stone-800/50 py-32" aria-label="Why This Matters">
        <div className="max-w-2xl space-y-8">
          <p className="text-[10px] uppercase tracking-[0.5em] text-stone-600 mb-12">Why This Matters</p>
          <p className="text-2xl md:text-4xl font-light text-stone-300 leading-snug">I live it. ADHD. Bipolar 1.</p>
          <p className="text-2xl md:text-4xl font-light text-stone-300 leading-snug">The cycle of starting strong, crashing hard, and rebuilding from scratch.</p>
          <p className="text-2xl md:text-4xl font-light text-stone-300 leading-snug">The comparison trap.</p>
          <p className="text-2xl md:text-4xl font-light text-stone-300 leading-snug">I don&apos;t have a degree in psychology. I&apos;m not a therapist.</p>
          <p className="text-3xl md:text-5xl font-medium text-amber-400 leading-snug mt-12">
            Being seen — truly seen — is where recovery starts.
          </p>
          <p className="text-2xl md:text-4xl font-light text-stone-400 leading-snug mt-12">
            This isn&apos;t about having all the answers. It&apos;s about making sure no one has to struggle alone in the dark.
          </p>
        </div>
      </section>

      {/* Scene 5: What's Coming — minimal list */}
      <section className="h-screen flex items-center justify-center text-center px-6 border-t border-stone-800/50" aria-label="What's Coming">
        <div className="max-w-xl space-y-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-stone-600">What&apos;s Coming</p>
          <div className="space-y-8">
            <div className="border-t border-stone-800 pt-8">
              <p className="text-xl md:text-2xl text-stone-200 font-light">Tools and systems for building stability when motivation fails</p>
            </div>
            <div className="border-t border-stone-800 pt-8">
              <p className="text-xl md:text-2xl text-stone-200 font-light">Honest writing about the real experience of mental health recovery</p>
            </div>
            <div className="border-t border-stone-800 pt-8">
              <p className="text-xl md:text-2xl text-stone-200 font-light">A community where people support each other without judgment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 6: John — portrait */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 border-t border-stone-800/50" aria-label="About">
        <img
          src="/john-v2.jpg"
          alt="John Kevin"
          width={160}
          height={160}
          className="rounded-full object-cover border border-stone-700 mb-8"
        />
        <p className="text-stone-300 text-xl font-bold">John Kevin</p>
        <p className="text-stone-600 text-xs uppercase tracking-[0.2em] mt-2">Lived experience. Real advocacy.</p>
        <p className="text-stone-500 text-sm mt-6">Seen — because everyone deserves to be.</p>
      </section>

      {/* Scene 7: Resources — emergency grid */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 border-t border-stone-800/50" aria-label="Resources">
        <div className="max-w-3xl w-full">
          <p className="text-[10px] uppercase tracking-[0.5em] text-stone-600 mb-12">If you need help now</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resources.map((r) => (
              <div key={r.name} className="bg-stone-900/80 border border-stone-800 rounded-2xl p-8 text-left">
                <p className="text-amber-400 font-bold text-sm">{r.name}</p>
                <p className="text-stone-500 text-xs italic mt-2">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 px-6 py-16 text-center">
        <p className="text-stone-700 text-[10px]">This site is not a substitute for professional mental health care.</p>
        <p className="text-stone-700 text-[10px]">The stories shared here are personal experiences and do not constitute medical advice.</p>
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-stone-600">
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