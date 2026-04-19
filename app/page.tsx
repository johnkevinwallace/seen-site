"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [storyText, setStoryText] = useState("");
  const [storyStatus, setStoryStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [confirmedParam] = useState(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("confirmed");
  });

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubStatus("success");
      } else {
        setSubStatus("error");
      }
    } catch {
      setSubStatus("error");
    }
    setEmail("");
  };

  const handleStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText || storyText.trim().length < 10) return;
    setStoryStatus("loading");
    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story: storyText.trim() }),
      });
      if (res.ok) {
        setStoryStatus("success");
      } else {
        setStoryStatus("error");
      }
    } catch {
      setStoryStatus("error");
    }
    setStoryText("");
  };

  return (
    <>
      <main className="h-dvh overflow-y-scroll snap-y snap-mandatory">
        {/* Hero */}
        <section className="min-h-dvh snap-start flex items-center justify-center px-6 text-center">
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
        <section id="mission" className="min-h-dvh snap-start flex items-center justify-center px-6 text-center">
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
        <section id="why" className="min-h-dvh snap-start flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl w-full">
            <h2 className="text-sm uppercase tracking-[0.2em] text-stone-500 mb-8">Why This Matters</h2>
            <div className="space-y-6 text-stone-400 leading-relaxed text-left mx-auto max-w-2xl">
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
        <section id="coming" className="min-h-dvh snap-start flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl w-full">
            <h2 className="text-sm uppercase tracking-[0.2em] text-stone-500 mb-8">What&apos;s Coming</h2>
            <ul className="space-y-6 text-stone-400">
              <li>→ Tools and systems for building stability when motivation fails</li>
              <li>→ Honest writing about the real experience of mental health recovery</li>
              <li>→ A community where people support each other without judgment</li>
            </ul>
          </div>
        </section>

        {/* Share Your Story */}
        <section id="share" className="min-h-dvh snap-start flex flex-col items-center justify-center px-6 text-center">
          <div className="w-80">
            <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-4">Share Your Story</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">Your story matters. Share it here — completely anonymous. No email, no name, no way to trace it back to you. Just your words.</p>
            {storyStatus === "success" ? (
              <p className="text-amber-400">Thank you. Your story has been received.</p>
            ) : (
              <form onSubmit={handleStory} className="flex flex-col gap-4">
                <textarea
                  required
                  minLength={10}
                  maxLength={5000}
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Write your story here..."
                  rows={6}
                  className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50 resize-none"
                />
                <button
                  type="submit"
                  disabled={storyStatus === "loading" || storyText.trim().length < 10}
                  className="w-full px-4 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
                >
                  {storyStatus === "loading" ? "..." : "Submit anonymously"}
                </button>
              </form>
            )}
            {storyStatus === "error" && (
              <p className="text-red-400 text-xs mt-2">Something went wrong. Try again?</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer id="loop" className="min-h-dvh snap-start flex flex-col items-center justify-center px-6 text-center">
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
            <p className="text-stone-600 text-sm mb-10">Seen — because everyone deserves to be.</p>
          </div>

          {/* Newsletter signup */}
          <div className="w-64">
            <p className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-4">Stay in the loop</p>
            {subStatus === "success" ? (
              <p className="text-amber-400 text-sm">Check your inbox to confirm your subscription.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50"
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  className="w-full px-4 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
                >
                  {subStatus === "loading" ? "..." : "Subscribe"}
                </button>
              </form>
            )}
            {subStatus === "error" && (
              <p className="text-red-400 text-xs mt-2">Something went wrong. Try again?</p>
            )}
          </div>
        </footer>

        {/* Resources */}
        <section id="resources" className="min-h-dvh snap-start flex flex-col items-center justify-center px-6 text-center">
          <div className="w-80">
            <p className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-8">If you need help now</p>
            <div className="space-y-6">
              <div>
                <p className="text-amber-400 text-sm" style={{ fontWeight: 700 }}>988 Suicide & Crisis Lifeline</p>
                <p className="text-stone-400 text-xs italic">Call or text 988 — 24/7, free, confidential</p>
              </div>
              <div>
                <p className="text-amber-400 text-sm" style={{ fontWeight: 700 }}>Crisis Text Line</p>
                <p className="text-stone-400 text-xs italic">Text HOME to 741741 — 24/7, free, confidential</p>
              </div>
              <div>
                <p className="text-amber-400 text-sm" style={{ fontWeight: 700 }}>NAMI Helpline</p>
                <p className="text-stone-400 text-xs italic">1-800-950-NAMI (6264) — Mon–Fri, 10am–10pm ET</p>
              </div>
              <div>
                <p className="text-amber-400 text-sm" style={{ fontWeight: 700 }}>SAMHSA Helpline</p>
                <p className="text-stone-400 text-xs italic">1-800-662-4357 — 24/7, free, confidential</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 pt-8 border-t border-stone-800 space-y-6">
              <p className="text-stone-700 text-[10px]">This site is not a substitute for professional mental health care.</p>
              <p className="text-stone-700 text-[10px]">If you are in crisis, please reach out to the resources listed above.</p>
              <p className="text-stone-700 text-[10px]">The stories shared here are personal experiences and do not constitute medical advice.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}