"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

export default function AnalyticsGate() {
  const [enabled, setEnabled] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setEnabled(localStorage.getItem("seen_owner_analytics_optout") !== "1");
  }, []);

  if (!enabled || pathname === "/share") return null;
  return <Analytics />;
}