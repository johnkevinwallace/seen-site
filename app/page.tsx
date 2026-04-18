"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const onScroll = () => setScrolled(main.scrollTop > 50);
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {/* Hero */}
        <section className="h-screen snap-start flex items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Everyone deserves to be{" "}
              <span className="italic text-amber-400">seen</span>.
            </h1>
            <p className="text-lg md:text-xl text-stone-400 max-w-2xl leading-relaxed">
              Too many people struggle in silence — with mental health, with
              setbacks, with the feeling that no one notices. This is a space that
              notices.
            </p>
            <div
              className={`mt-16 flex justify-center transition-opacity duration-700 ${scrolled || !showHint ? "opacity-0" : "opacity-0 animate-[fadeScroll_10s_ease-in-out_infinite]"}`}
            >
              <span className="text-stone-600 text-xs uppercase tracking-[0.2em]">Scroll down</span>
            </div>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section id="mission" className="h-screen snap-start flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl w-full grid md:grid-cols-3 gap-20">
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-6">Mission</h2>
              <p className="text-lg text-stone-300 leading-relaxed">Help those struggling with their mental health to be seen.</p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-6">Vision</h2>
              <p className="text-lg text-stone-300 leading-relaxed">Become a prominent voice in the mental health advocacy space.</p>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-6">Values</h2>
              <p className="text-lg text-stone-300 leading-relaxed">Compassion. Respect. Support.</p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section id="why" className="h-screen snap-start flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl w-full">
            <h2 className="text-sm uppercase tracking-[0.2em] text-stone-500 mb-8">Why This Matters</h2>
            <div className="space-y-6 text-stone-400 leading-loose">
              <p><span className="font-semibold text-stone-200">I live it.</span></p>
              <p>ADHD. Bipolar 1.</p>
              <p>The cycle of starting strong, crashing hard, and rebuilding from scratch.</p>
              <p>The comparison trap — watching everyone else move forward while you&apos;re just trying to stand up.</p>
              <p>I don&apos;t have a degree in psychology. I&apos;m not a therapist.</p>
              <p>But I know what it&apos;s like to fight your own brain and still show up the next day.</p>
              <p>And I know that being seen — truly seen, not judged, not fixed, just acknowledged — is where recovery starts.</p>
              <p>This isn&apos;t about having all the answers. It&apos;s about making sure no one has to struggle alone in the dark.</p>
            </div>
          </div>
        </section>

        {/* What's Coming */}
        <section id="coming" className="h-screen snap-start flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl w-full">
            <h2 className="text-sm uppercase tracking-[0.2em] text-stone-500 mb-8">What&apos;s Coming</h2>
            <ul className="space-y-8 text-stone-400">
              <li>→ Tools and systems for building stability when motivation fails</li>
              <li>→ Honest writing about the real experience of mental health recovery</li>
              <li>→ A community where people support each other without judgment</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="h-screen snap-start flex items-center justify-center px-6 text-center">
          <div>
            <img
              src="/john-v2.jpg"
              alt="John Kevin Wallace"
              width={230}
              height={230}
              className="rounded-full object-cover mb-6 border border-stone-700 mx-auto"
            />
            <p className="text-stone-500 text-sm mb-2">John Kevin Wallace</p>
            <p className="text-stone-600 text-xs uppercase tracking-[0.2em] mb-6">Lived experience. Real advocacy.</p>
            <p className="text-stone-600 text-sm">Seen — because everyone deserves to be.</p>
          </div>
        </footer>
      </main>
    </>
  );
}