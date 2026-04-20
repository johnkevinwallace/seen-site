"use client";

import { useEffect, useState } from "react";

const KEY = "seen_owner_analytics_optout";

export default function OwnerAnalyticsPage() {
  const [optedOut, setOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOptedOut(localStorage.getItem(KEY) === "1");
    setMounted(true);
  }, []);

  function disable() {
    localStorage.setItem(KEY, "1");
    setOptedOut(true);
  }

  function enable() {
    localStorage.removeItem(KEY);
    setOptedOut(false);
  }

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--accent, #f59e0b)" }}>
        Owner Analytics Settings
      </h1>

      <p style={{ marginBottom: "1rem" }}>
        Status for this device: <strong>{mounted ? (optedOut ? "OFF" : "ON") : "…"}</strong>
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        <button
          onClick={disable}
          disabled={!mounted || optedOut}
          style={{
            padding: "0.5rem 1rem",
            background: optedOut ? "#555" : "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: optedOut ? "default" : "pointer",
            opacity: optedOut ? 0.5 : 1,
          }}
        >
          Disable analytics on this device
        </button>
        <button
          onClick={enable}
          disabled={!mounted || !optedOut}
          style={{
            padding: "0.5rem 1rem",
            background: !optedOut ? "#555" : "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: !optedOut ? "default" : "pointer",
            opacity: !optedOut ? 0.5 : 1,
          }}
        >
          Enable analytics on this device
        </button>
      </div>

      <p style={{ fontSize: "0.85rem", color: "#999" }}>
        Open this page on each device (phone, PC) to set individually. Normal visitors are unaffected — analytics stays ON by default.
      </p>
    </div>
  );
}