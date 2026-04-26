"use client";

import { useEffect } from "react";

/**
 * iOS Safari fix: recalculate viewport height when virtual keyboard
 * opens/closes to prevent immovable white-space gaps.
 *
 * Problem: on iOS Safari, focusing an input opens the keyboard, pushing
 * the page content up. When the keyboard closes, the scroll offset
 * persists, leaving white space at the bottom.
 *
 * Fix: on focusout, force scroll back to top. Also watch visualViewport
 * to keep a --vh CSS variable in sync.
 */
export default function ViewportFix() {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as Record<string, unknown>).MSStream;

    const setVH = () => {
      const vv = window.visualViewport;
      const vh = vv ? vv.height : window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
    };

    const handleResize = () => {
      setVH();

      const vv = window.visualViewport;
      if (!vv) return;

      const fullHeight = window.innerHeight;
      const vvHeight = vv.height;

      // When keyboard closes, visualViewport expands back to near full height
      if (vvHeight > fullHeight * 0.9) {
        // Reset body/html scroll to eliminate stuck gap
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        // Force reflow on body to ensure layout recalculates
        const originalHeight = document.body.style.height;
        document.body.style.height = `${fullHeight}px`;
        requestAnimationFrame(() => {
          document.body.style.height = originalHeight;
        });
      }
    };

    const handleFocusOut = () => {
      // Small delay to let keyboard animation finish
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);
    };

    setVH();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return null;
}
