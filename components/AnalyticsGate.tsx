"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

export default function AnalyticsGate() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(localStorage.getItem("seen_owner_analytics_optout") !== "1");
  }, []);

  if (!enabled) return null;
  return <Analytics />;
}