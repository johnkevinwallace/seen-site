"use client";

import { useState } from "react";

const ADMIN_PASSWORD = "seen-admin-2026";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [triggerWarning, setTriggerWarning] = useState("");
  const [body, setBody] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function generateSlug(t: string) {
    return t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  async function handlePublish() {
    if (!title || !body) return;

    setPublishing(true);
    setStatus("idle");
    setErrorMsg("");

    const finalSlug = slug || generateSlug(title);

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: finalSlug,
          excerpt: excerpt || null,
          trigger_warning: triggerWarning || null,
          body,
          password: ADMIN_PASSWORD,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      } else {
        setStatus("success");
        setTitle("");
        setSlug("");
        setExcerpt("");
        setTriggerWarning("");
        setBody("");
      }
    } catch (err) {
      setErrorMsg("Network error");
      setStatus("error");
    }

    setPublishing(false);
  }

  if (!authenticated) {
    return (
      <div className="min-h-dvh bg-stone-950 text-stone-100 flex items-center justify-center">
        <div className="w-64 text-center">
          <h1 className="text-xl font-bold mb-6">Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50 mb-3"
          />
          {passwordError && (
            <p className="text-red-400 text-xs mb-3">Wrong password</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="max-w-2xl mx-auto px-6 py-24 overflow-hidden">
        <h1 className="text-2xl font-bold mb-2">New Post</h1>
        <p className="text-stone-600 text-xs mb-8">Write, preview, publish to Supabase</p>

        <div className="space-y-6">
          <div>
            <label className="block text-stone-400 text-xs uppercase tracking-[0.1em] mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slug) setSlug(generateSlug(e.target.value));
              }}
              placeholder="Why I Started Seen"
              className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50"
            />
          </div>

          <div>
            <label className="block text-stone-400 text-xs uppercase tracking-[0.1em] mb-2">URL Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="why-i-started-seen"
              className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50"
            />
          </div>

          <div>
            <label className="block text-stone-400 text-xs uppercase tracking-[0.1em] mb-2">Excerpt (optional — shows in blog list)</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary of what this post is about"
              className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50"
            />
          </div>

          <div>
            <label className="block text-stone-400 text-xs uppercase tracking-[0.1em] mb-2">Trigger Warning (optional)</label>
            <input
              type="text"
              value={triggerWarning}
              onChange={(e) => setTriggerWarning(e.target.value)}
              placeholder="e.g. self-harm, substance abuse, suicide mention"
              className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50"
            />
          </div>

          <div>
            <label className="block text-stone-400 text-xs uppercase tracking-[0.1em] mb-2">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your post here...&#10;&#10;Separate paragraphs with blank lines."
              rows={15}
              className="w-full bg-stone-900 border border-stone-700 rounded px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/50 resize-y leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePublish}
              disabled={publishing || !title || !body}
              className="px-6 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              {publishing ? "Publishing..." : "Publish"}
            </button>
            {status === "success" && (
              <p className="text-green-400 text-sm">Published ✓</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg || "Something went wrong."}</p>
            )}
          </div>
        </div>

        {body && (
          <div className="mt-16 border-t border-stone-800 pt-8">
            <h2 className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-6">Preview</h2>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              {excerpt && <p className="text-stone-500 text-sm mb-8">{excerpt}</p>}
              <div className="text-stone-400 leading-loose text-left">
                {body.split(/\n\n+/).filter((b) => b.trim()).map((block, i) => (
                  <p key={i} className="mb-12 break-words" style={{ whiteSpace: "pre-line", overflowWrap: "anywhere" }}>{block.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}