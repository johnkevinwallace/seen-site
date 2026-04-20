"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [storyText, setStoryText] = useState("");
  const [storyStatus, setStoryStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [website, setWebsite] = useState(""); // honeypot
  const [publishedStories, setPublishedStories] = useState<{ story: string; created_at: string; featured: boolean }[]>([]);
  const [storiesLoaded, setStoriesLoaded] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0 && storyIndex < publishedStories.length - 1) {
        setStoryIndex((i) => i + 1);
      } else if (distance < 0 && storyIndex > 0) {
        setStoryIndex((i) => i - 1);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const prevStory = () => setStoryIndex((i) => Math.max(0, i - 1));
  const nextStory = () => setStoryIndex((i) => Math.min(publishedStories.length - 1, i + 1));

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

  useEffect(() => {
    fetch("/api/stories/public")
      .then((r) => r.json())
      .then((data) => {
        if (data.stories) setPublishedStories(data.stories.filter((s: { featured: boolean }) => s.featured));
      })
      .catch(() => {})
      .finally(() => setStoriesLoaded(true));
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
        body: JSON.stringify({ story: storyText.trim(), website }),
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
      <main className="h-dvh overflow-y-scroll overflow-x-hidden snap-y snap-mandatory">
        {/* Hero */}
        <section className="min-h-dvh snap-start flex items-center justify-center text-center">
          <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Everyone deserves to be{" "}
              <span className="italic text-amber-400">seen</span>.
            </h1>
            <p className="text-lg md:text-xl text-stone-400 leading-relaxed">
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
        <section id="mission" className="min-h-dvh snap-start flex items-center justify-center text-center">
          <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-2">Mission</h2>
                <p className="text-lg text-stone-300 leading-relaxed">Help those struggling with their mental health to be seen.</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-2">Vision</h2>
                <p className="text-lg text-stone-300 leading-relaxed">Become a prominent voice in the mental health advocacy space.</p>
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-2">Values</h2>
                <p className="text-lg text-stone-300 leading-relaxed">Compassion. Respect. Support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section id="why" className="min-h-dvh snap-start flex items-center justify-center text-center">
          <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-stone-500 mb-8">Why This Matters</h2>
            <div className="text-stone-400 leading-relaxed" style={{ textAlign: "center" }}>
              <p style={{ marginBottom: "12px" }}>I live it.</p>
              <p style={{ marginBottom: "12px" }}>ADHD. Bipolar 1.</p>
              <p style={{ marginBottom: "12px" }}>The cycle of starting strong, crashing hard, and rebuilding from scratch.</p>
              <p style={{ marginBottom: "12px" }}>The comparison trap — watching everyone else move forward while you&apos;re just trying to stand up.</p>
              <p style={{ marginBottom: "12px" }}>I don&apos;t have a degree in psychology. I&apos;m not a therapist.</p>
              <p style={{ marginBottom: "12px" }}>But I know what it&apos;s like to fight your own brain and still show up the next day.</p>
              <p style={{ marginBottom: "12px" }}>And I know that being seen — truly seen, not judged, not fixed, just acknowledged — is where recovery starts.</p>
              <p style={{ marginBottom: "12px" }}>This isn&apos;t about having all the answers. It&apos;s about making sure no one has to struggle alone in the dark.</p>
            </div>
          </div>
        </section>

        {/* What's Coming */}
        <section id="coming" className="min-h-dvh snap-start flex items-center justify-center text-center">
          <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-stone-500 mb-8">What&apos;s Coming</h2>
            <div className="text-stone-400" style={{ textAlign: "left" }}>
              <p style={{ marginBottom: "12px" }}>→ Tools and systems for building stability when motivation fails</p>
              <p style={{ marginBottom: "12px" }}>→ Honest writing about the real experience of mental health recovery</p>
              <p style={{ marginBottom: "12px" }}>→ A community where people support each other without judgment</p>
            </div>
          </div>
        </section>

        {/* Published Stories */}
        {publishedStories.length > 0 && (
          <section id="stories" className="min-h-dvh snap-start flex flex-col items-center justify-center text-center">
            <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
              <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-10">Featured Stories</h2>
              <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                style={{ position: "relative", minHeight: "200px" }}
              >
                {/* Navigation arrows */}
                {publishedStories.length > 1 && (
                  <>
                    <button
                      onClick={prevStory}
                      disabled={storyIndex === 0}
                      style={{
                        position: "absolute",
                        left: "-48px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: storyIndex === 0 ? "#44403c" : "#fbbf24",
                        cursor: storyIndex === 0 ? "default" : "pointer",
                        fontSize: "24px",
                        padding: "8px",
                        transition: "color 0.2s",
                      }}
                      aria-label="Previous story"
                    >
                      ◀
                    </button>
                    <button
                      onClick={nextStory}
                      disabled={storyIndex === publishedStories.length - 1}
                      style={{
                        position: "absolute",
                        right: "-48px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: storyIndex === publishedStories.length - 1 ? "#44403c" : "#fbbf24",
                        cursor: storyIndex === publishedStories.length - 1 ? "default" : "pointer",
                        fontSize: "24px",
                        padding: "8px",
                        transition: "color 0.2s",
                      }}
                      aria-label="Next story"
                    >
                      ▶
                    </button>
                  </>
                )}
                {/* Story content */}
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      display: "flex",
                      transition: "transform 0.4s ease",
                      transform: `translateX(-${storyIndex * 100}%)`,
                    }}
                  >
                    {publishedStories.map((s, i) => {
                      const date = new Date(s.created_at);
                      const month = date.toLocaleString("en-US", { month: "long" });
                      const year = date.getFullYear();
                      return (
                        <div key={i} style={{ minWidth: "100%", textAlign: "left" }}>
                          <div style={{
                            maxHeight: "360px",
                            overflowY: "auto",
                            padding: "12px 16px",
                            borderRadius: "6px",
                            background: "var(--bg, #0c0a09)",
                            border: "1px solid var(--border, #292524)",
                          }}>
                            <p style={{ color: "var(--text, #a8a29e)", lineHeight: "1.625", marginBottom: "0", whiteSpace: "pre-wrap", fontSize: "14px" }}>
                              {s.story}
                            </p>
                          </div>
                          <p style={{ color: "#78716c", fontSize: "12px", marginTop: "16px" }}>
                            Shared {month} {year}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Counter */}
                {publishedStories.length > 1 && (
                  <p style={{ color: "#78716c", fontSize: "12px", marginTop: "24px", letterSpacing: "0.05em" }}>
                    {storyIndex + 1} / {publishedStories.length}
                  </p>
                )}
              </div>
              <a href="/stories" style={{ color: "#fbbf24", fontSize: "14px", textDecoration: "none", display: "inline-block", marginTop: "24px" }}>Read more stories →</a>
            </div>
          </section>
        )}

        {/* Share Your Story */}
        <section id="share" className="min-h-dvh snap-start flex flex-col items-center justify-center text-center">
          <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-amber-400 mb-4">Share Your Story</h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">Your story matters. Share it here — completely anonymous. No email, no name, no cookies, no tracking. Just your words. We never collect or store any identifying information.</p>
            <p className="text-stone-600 text-xs leading-relaxed mb-2">Stories are reviewed before publishing. We welcome honest, respectful accounts of mental health experiences. Content that promotes harm, contains hate speech, or offers medical advice will not be published.</p>
            <p className="mb-8"><a href="/privacy" className="text-stone-600 text-xs hover:text-amber-400 transition-colors">See our privacy policy →</a></p>
            {storyStatus === "success" ? (
              <p className="text-amber-400">Thank you. Your story has been received.</p>
            ) : (
              <form onSubmit={handleStory} className="flex flex-col gap-4">
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
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
        <footer id="loop" className="min-h-dvh snap-start flex flex-col items-center justify-center text-center">
          <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
            <img
              src="/john-v2.jpg"
              alt="John Kevin"
              width={230}
              height={230}
              className="rounded-full object-cover mb-6 border border-stone-700 mx-auto"
            />
            <p className="text-stone-500 text-sm mb-2">John Kevin</p>
            <p className="text-stone-600 text-xs uppercase tracking-[0.2em] mb-6">Lived experience. Real advocacy.</p>
            <p className="text-stone-600 text-sm mb-10">Seen — because everyone deserves to be.</p>

            {/* Newsletter signup */}
            <div>
              <p className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-4">Stay in the loop</p>
              {subStatus === "success" ? (
                <div>
                  <p className="text-amber-400 text-sm" style={{ marginBottom: "12px" }}>Check your inbox to confirm your subscription.</p>
                  <p className="text-stone-600 text-xs">Don&apos;t see it? Check your spam folder.</p>
                </div>
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
          </div>
        </footer>

        {/* Resources */}
        <section id="resources" className="min-h-dvh snap-start flex flex-col items-center justify-center text-center">
          <div className="w-full mx-auto" style={{ maxWidth: "580px", paddingLeft: "24px", paddingRight: "24px" }}>
            <p className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-6">If you need help now</p>
            <div className="text-left">
              <div className="mb-4">
                <p className="text-amber-400 text-sm font-bold">988 Suicide & Crisis Lifeline</p>
                <p className="text-stone-400 text-xs italic">Call or text 988 — 24/7, free, confidential</p>
              </div>
              <div className="mb-4">
                <p className="text-amber-400 text-sm font-bold">Crisis Text Line</p>
                <p className="text-stone-400 text-xs italic">Text HOME to 741741 — 24/7, free, confidential</p>
              </div>
              <div className="mb-4">
                <p className="text-amber-400 text-sm font-bold">NAMI Helpline</p>
                <p className="text-stone-400 text-xs italic">1-800-950-NAMI (6264) — Mon–Fri, 10am–10pm ET</p>
              </div>
              <div className="mb-4">
                <p className="text-amber-400 text-sm font-bold">SAMHSA Helpline</p>
                <p className="text-stone-400 text-xs italic">1-800-662-4357 — 24/7, free, confidential</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 pt-8 border-t border-stone-800">
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