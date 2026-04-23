"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("=== PAGE ERROR ===");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Digest:", error.digest);
  }, [error]);

  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100 flex items-center justify-center">
      <div className="text-center" style={{ maxWidth: "560px", padding: "24px" }}>
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-stone-400 text-sm mb-4">
          This page couldn&apos;t load. It might be a temporary issue.
        </p>
        <div className="text-left bg-stone-900 p-3 rounded mb-6 overflow-auto">
          <p className="text-amber-400 text-xs font-mono mb-1">Error:</p>
          <p className="text-stone-300 text-xs font-mono">{error.message || "Unknown error"}</p>
          {error.digest && (
            <>
              <p className="text-amber-400 text-xs font-mono mt-2 mb-1">Digest:</p>
              <p className="text-stone-400 text-xs font-mono">{error.digest}</p>
            </>
          )}
        </div>
        <button
          onClick={reset}
          className="px-6 py-2 bg-amber-500 text-stone-950 font-semibold rounded hover:bg-amber-400 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}