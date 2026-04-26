"use client";

import { useEffect } from "react";

/**
 * iOS Safari fix: recalculate viewport height when virtual keyboard
 * opens/closes to prevent immovable white-space gaps.
 */
export default function ViewportFix() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
    };

    setVH();

    window.addEventListener("resize", setVH);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setVH);
    }

    return () => {
      window.removeEventListener("resize", setVH);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", setVH);
      }
    };
  }, []);

  return null;
}
