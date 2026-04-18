"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    const { error } = await supabase.from("subscribers").insert({ email });
    if (error) {
      if (error.code === "23505") {
        setSubStatus("success"); // already subscribed
      } else {
        setSubStatus("error");
      }
    } else {
      setSubStatus("success");
    }
    setEmail("");
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
        <section id="coming" className="min-h-dvh snap-start flex items-center justify-center px-6 text-center">
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
        <footer id="footer" className="min-h-dvh snap-start flex flex-col items-center justify-center px-6 text-center">
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
          <div className="w-full max-w-md">
            <p className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-4">Stay in the loop</p>
            {subStatus === "success" ? (
              <p className="text-amber-400 text-sm">You&apos;re in. We&apos;ll be in touch.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50"
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  className="px-4 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
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
      </main>
    </>
  );
}