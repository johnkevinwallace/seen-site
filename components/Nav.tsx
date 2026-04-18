"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/#mission", label: "Mission | Vision | Values" },
  { href: "/#why", label: "Why This Matters" },
  { href: "/#coming", label: "What's Coming" },
  { href: "/#share", label: "Share Your Story" },
  { href: "/#loop", label: "Stay In The Loop" },
  { href: "/#resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function handleClick(href: string) {
    setOpen(false);

    // If we're on the homepage and clicking a hash link, scroll manually
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.slice(2); // remove "/#"
      // Small delay so the menu closes first
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }

  // Only highlight "Home" if we're exactly on "/" with no hash
  // Highlight blog if on /blog
  // Section links never highlight (they're anchors, not pages)
  function getLinkColor(href: string) {
    if (href === "/") {
      return pathname === "/" && !window.location.hash ? "#fbbf24" : "#a8a29e";
    }
    if (href.startsWith("/blog")) {
      return pathname.startsWith("/blog") ? "#fbbf24" : "#a8a29e";
    }
    // Section links are always neutral
    return "#a8a29e";
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 100001,
          width: "44px",
          height: "44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          cursor: "pointer",
          background: "rgba(28, 25, 23, 0.8)",
          border: "1px solid #44403c",
          borderRadius: "8px",
          backdropFilter: "blur(8px)",
          padding: "0",
        }}
        aria-label="Toggle menu"
      >
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "#d6d3d1",
            transition: "all 0.3s",
            transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "#d6d3d1",
            transition: "all 0.3s",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "#d6d3d1",
            transition: "all 0.3s",
            transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
          }}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(28, 25, 23, 0.8)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
          }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Menu panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "256px",
          background: "#0c0a09",
          borderRight: "1px solid #292524",
          zIndex: 100000,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{ paddingTop: "80px", paddingLeft: "32px", paddingRight: "32px" }}>
          <p
            style={{
              color: "#fbbf24",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "32px",
            }}
          >
            Navigate
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  style={{
                    fontSize: "14px",
                    letterSpacing: "0.025em",
                    color: "#a8a29e",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "block",
                    padding: "4px 0",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}