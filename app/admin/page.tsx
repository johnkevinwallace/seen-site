"use client";

import { useState, useEffect, useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface Draft {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  trigger_warning: string | null;
  body: string;
  created_at: string;
}

interface Story {
  id: string;
  story: string;
  created_at: string;
  status: string | null;
  featured: boolean;
}

type AdminTab = "posts" | "stories" | "published";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("posts");

  // Blog post state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [triggerWarning, setTriggerWarning] = useState("");
  const [body, setBody] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftsLoading, setDraftsLoading] = useState(false);

  // Story review state
  const [stories, setStories] = useState<Story[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [expandedStories, setExpandedStories] = useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Published stories state (for featuring)
  const [publishedStories, setPublishedStories] = useState<Story[]>([]);
  const [publishedLoading, setPublishedLoading] = useState(false);

  function loadDrafts() {
    setDraftsLoading(true);
    fetch("/api/draft")
      .then((r) => r.json())
      .then((data) => {
        if (data.drafts) setDrafts(data.drafts);
      })
      .finally(() => setDraftsLoading(false));
  }

  function loadStories() {
    setStoriesLoading(true);
    fetch("/api/stories")
      .then((r) => r.json())
      .then((data) => {
        if (data.stories) setStories(data.stories);
      })
      .finally(() => setStoriesLoading(false));
  }

  function loadPublishedStories() {
    setPublishedLoading(true);
    fetch("/api/stories/published")
      .then((r) => r.json())
      .then((data) => {
        if (data.stories) setPublishedStories(data.stories);
      })
      .finally(() => setPublishedLoading(false));
  }

  useEffect(() => {
    if (authenticated) {
      loadDrafts();
      loadStories();
      loadPublishedStories();
    }
  }, [authenticated]);

  // Check if already logged in on mount
  useEffect(() => {
    fetch("/api/draft")
      .then((r) => {
        if (r.ok) setAuthenticated(true);
      })
      .catch(() => {});
  }, []);

  const previewHtml = useMemo(() => {
    if (!body) return "";
    const html = marked.parse(body, { async: false, breaks: true, gfm: true }) as string;
    return DOMPurify.sanitize(html);
  }, [body]);

  async function handleLogin() {
    setAuthLoading(true);
    setPasswordError(false);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
        setPassword("");
      } else {
        setPasswordError(true);
      }
    } catch {
      setPasswordError(true);
    }

    setAuthLoading(false);
  }

  function generateSlug(t: string) {
    return t
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function resetForm() {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setTriggerWarning("");
    setBody("");
    setStatus("idle");
    setErrorMsg("");
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      } else {
        setStatus("success");
        resetForm();
        loadDrafts();
      }
    } catch (err) {
      setErrorMsg("Network error");
      setStatus("error");
    }

    setPublishing(false);
  }

  async function handleSaveDraft() {
    if (!title || !body) return;
    setPublishing(true);
    setStatus("idle");
    setErrorMsg("");

    const finalSlug = slug || generateSlug(title);

    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: finalSlug,
          excerpt: excerpt || null,
          trigger_warning: triggerWarning || null,
          body,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      } else {
        setStatus("success");
        resetForm();
        loadDrafts();
      }
    } catch (err) {
      setErrorMsg("Network error");
      setStatus("error");
    }

    setPublishing(false);
  }

  function loadDraft(d: Draft) {
    setTitle(d.title);
    setSlug(d.slug);
    setExcerpt(d.excerpt || "");
    setTriggerWarning(d.trigger_warning || "");
    setBody(d.body);
    setStatus("idle");
    setErrorMsg("");
  }

  function toggleStoryExpand(id: string) {
    setExpandedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handlePublishStory(id: string) {
    setActionLoading(id);
    try {
      const res = await fetch("/api/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "published" }),
      });
      if (res.ok) {
        setStories((prev) => prev.filter((s) => s.id !== id));
        loadPublishedStories();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || `Failed to publish (HTTP ${res.status})`);
      }
    } catch (err) {
      alert("Network error publishing story");
    }
    setActionLoading(null);
  }

  async function handleDeleteStory(id: string) {
    if (!confirm("Delete this story permanently?")) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/stories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setStories((prev) => prev.filter((s) => s.id !== id));
        setPublishedStories((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {}
    setActionLoading(null);
  }

  async function handleToggleFeatured(id: string, currentFeatured: boolean) {
    setActionLoading(id);
    try {
      const res = await fetch("/api/stories/feature", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, featured: !currentFeatured }),
      });
      if (res.ok) {
        setPublishedStories((prev) =>
          prev.map((s) => (s.id === id ? { ...s, featured: !currentFeatured } : s))
        );
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to toggle featured");
      }
    } catch {
      alert("Network error toggling featured");
    }
    setActionLoading(null);
  }

  const pendingCount = stories.length;

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
            disabled={authLoading}
            className="w-full px-4 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {authLoading ? "Logging in..." : "Enter"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100">
      <div className="max-w-2xl mx-auto px-6 py-24 overflow-hidden">
        {/* Tab navigation */}
        <div className="flex gap-6 mb-8 border-b border-stone-800 pb-3">
          <button
            onClick={() => setActiveTab("posts")}
            className="relative text-sm font-semibold uppercase tracking-[0.15em] transition-colors"
            style={{ color: activeTab === "posts" ? "#fbbf24" : "#a8a29e" }}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className="relative text-sm font-semibold uppercase tracking-[0.15em] transition-colors"
            style={{ color: activeTab === "stories" ? "#fbbf24" : "#a8a29e" }}
          >
            Stories
            {pendingCount > 0 && (
              <span
                className="ml-2 px-2 py-0.5 text-xs rounded-full font-bold"
                style={{ backgroundColor: "#fbbf24", color: "#0c0a09" }}
              >
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveTab("published"); if (publishedStories.length === 0) loadPublishedStories(); }}
            className="relative text-sm font-semibold uppercase tracking-[0.15em] transition-colors"
            style={{ color: activeTab === "published" ? "#fbbf24" : "#a8a29e" }}
          >
            Published
          </button>
        </div>

        {activeTab === "stories" && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Story Review</h1>
            <p className="text-stone-600 text-xs mb-8">
              {pendingCount} pending submission{pendingCount !== 1 ? "s" : ""}
            </p>

            {storiesLoading ? (
              <p className="text-stone-500 text-sm">Loading stories...</p>
            ) : stories.length === 0 ? (
              <p className="text-stone-600 text-sm">No pending stories. Nice work!</p>
            ) : (
              <div className="space-y-4">
                {stories.map((s) => {
                  const isExpanded = expandedStories.has(s.id);
                  const isActionLoading = actionLoading === s.id;
                  const truncated = s.story.length > 200;
                  const displayText =
                    isExpanded || !truncated
                      ? s.story
                      : s.story.slice(0, 200) + "...";

                  return (
                    <div
                      key={s.id}
                      className="border border-stone-800 rounded p-4"
                    >
                      <p
                        className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap"
                        style={{ marginBottom: "8px" }}
                      >
                        {displayText}
                      </p>
                      {truncated && (
                        <button
                          onClick={() => toggleStoryExpand(s.id)}
                          className="text-amber-400 text-xs hover:underline mb-2"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                      <p className="text-stone-600 text-xs" style={{ marginBottom: "12px" }}>
                        Submitted {new Date(s.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handlePublishStory(s.id)}
                          disabled={isActionLoading}
                          className="px-4 py-1.5 bg-amber-400 text-stone-950 text-xs font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
                        >
                          {isActionLoading ? "..." : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDeleteStory(s.id)}
                          disabled={isActionLoading}
                          className="px-4 py-1.5 bg-stone-800 text-stone-100 text-xs font-semibold rounded hover:bg-stone-700 transition-colors disabled:opacity-50 border border-stone-700"
                        >
                          {isActionLoading ? "..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "published" && (
          <div>
            <h1 className="text-2xl font-bold mb-2">Published Stories</h1>
            <p className="text-stone-600 text-xs mb-8">
              Toggle which stories appear on the homepage carousel.
            </p>

            {publishedLoading ? (
              <p className="text-stone-500 text-sm">Loading published stories...</p>
            ) : publishedStories.length === 0 ? (
              <p className="text-stone-600 text-sm">No published stories yet.</p>
            ) : (
              <div className="space-y-4">
                {publishedStories.map((s) => {
                  const isActionLoadingStory = actionLoading === s.id;
                  const isExpanded = expandedStories.has(s.id);
                  const truncated = s.story.length > 200;
                  const displayText =
                    isExpanded || !truncated
                      ? s.story
                      : s.story.slice(0, 200) + "...";

                  return (
                    <div
                      key={s.id}
                      className="border border-stone-800 rounded p-4"
                    >
                      <p
                        className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap"
                        style={{ marginBottom: "8px" }}
                      >
                        {displayText}
                      </p>
                      {truncated && (
                        <button
                          onClick={() => toggleStoryExpand(s.id)}
                          className="text-amber-400 text-xs hover:underline mb-2"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                      <p className="text-stone-600 text-xs" style={{ marginBottom: "12px" }}>
                        Published {new Date(s.created_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-3 items-center">
                        <button
                          onClick={() => handleToggleFeatured(s.id, s.featured)}
                          disabled={isActionLoadingStory}
                          className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors disabled:opacity-50 ${
                            s.featured
                              ? "bg-amber-400 text-stone-950 hover:bg-amber-300"
                              : "bg-stone-800 text-stone-100 hover:bg-stone-700 border border-stone-700"
                          }`}
                        >
                          {isActionLoadingStory ? "..." : s.featured ? "★ Featured" : "☆ Feature"}
                        </button>
                        <button
                          onClick={() => handleDeleteStory(s.id)}
                          disabled={isActionLoadingStory}
                          className="px-4 py-1.5 bg-stone-800 text-stone-100 text-xs font-semibold rounded hover:bg-stone-700 transition-colors disabled:opacity-50 border border-stone-700"
                        >
                          {isActionLoadingStory ? "..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "posts" && (
          <>
            {/* Drafts section */}
            {drafts.length > 0 && (
              <div className="mb-10 border border-stone-800 rounded p-4">
                <h2 className="text-stone-500 text-xs uppercase tracking-[0.2em] mb-4">Drafts</h2>
                <div className="space-y-2">
                  {drafts.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => loadDraft(d)}
                      className="w-full text-left px-3 py-2 bg-stone-900 rounded hover:bg-stone-800 transition-colors"
                    >
                      <span className="text-stone-100 text-sm">{d.title}</span>
                      <span className="text-stone-600 text-xs ml-2">{new Date(d.created_at).toLocaleDateString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                <p className="text-stone-600 text-xs mt-1">Supports **bold**, *italic*, &lt;u&gt;underline&lt;/u&gt;, ## headings, ### subheadings</p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePublish}
                  disabled={publishing || !title || !body}
                  className="px-6 py-2 bg-amber-400 text-stone-950 text-sm font-semibold rounded hover:bg-amber-300 transition-colors disabled:opacity-50"
                >
                  {publishing ? "Publishing..." : "Publish"}
                </button>
                <button
                  onClick={handleSaveDraft}
                  disabled={publishing || !title || !body}
                  className="px-6 py-2 bg-stone-800 text-stone-100 text-sm font-semibold rounded hover:bg-stone-700 transition-colors disabled:opacity-50 border border-stone-700"
                >
                  {publishing ? "Saving..." : "Save Draft"}
                </button>
                {status === "success" && (
                  <p className="text-green-400 text-sm">Saved ✓</p>
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
                  <div
                    className="text-left prose-invert"
                    style={{ color: "#a8a29e", lineHeight: "1.625" }}
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <style jsx global>{`
          .prose-invert h2 {
            color: #fbbf24;
            font-weight: 700;
            font-size: 1.125rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
          }
          .prose-invert h3 {
            color: rgba(251, 191, 36, 0.8);
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 12px;
          }
          .prose-invert p {
            color: #a8a29e;
            line-height: 1.625;
            margin-bottom: 12px;
            overflow-wrap: anywhere;
          }
          .prose-invert strong {
            color: #f5f5f4;
          }
          .prose-invert a {
            color: #fbbf24;
            text-decoration: none;
          }
          .prose-invert em {
            color: #d6d3d1;
            font-style: italic;
          }
          .prose-invert u {
            color: #d6d3d1;
            text-decoration: underline;
          }
          .prose-invert a:hover {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  );
}