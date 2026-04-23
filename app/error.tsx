"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh bg-stone-950 text-stone-100 flex items-center justify-center">
      <div className="text-center" style={{ maxWidth: "480px", padding: "24px" }}>
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-stone-400 text-sm mb-6">
          This page couldn&apos;t load. It might be a temporary issue.
        </p>
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