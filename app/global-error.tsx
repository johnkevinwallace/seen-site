"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0c0a09", color: "#f5f5f4", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: "480px", padding: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>Something went wrong</h1>
          <p style={{ color: "#a8a29e", fontSize: "14px", marginBottom: "24px" }}>
            This page couldn&apos;t load. It might be a temporary issue.
          </p>
          <button
            onClick={reset}
            style={{ padding: "8px 24px", background: "#fbbf24", color: "#0c0a09", fontWeight: 600, border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}