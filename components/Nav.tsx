"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

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
  const { theme, toggle } = useTheme();

  // Hide nav on admin, blog, and terms pages
  if (pathname === "/admin" || pathname === "/terms" || pathname === "/blog" || pathname.startsWith("/blog/")) return null;

  function handleClick(href: string) {
    setOpen(false);
    if (pathname === "/" && href.startsWith("/#")) {
      const id = href.slice(2);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
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
          background: "var(--overlay-bg)",
          border: "1px solid var(--border)",
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
            background: "var(--text)",
            transition: "all 0.3s",
            transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "var(--text)",
            transition: "all 0.3s",
            opacity: open ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: "20px",
            height: "2px",
            background: "var(--text)",
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
            background: "var(--overlay-bg)",
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
          background: "var(--nav-bg)",
          borderRight: "1px solid var(--border)",
          zIndex: 100000,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ paddingTop: "80px", paddingLeft: "32px", paddingRight: "32px", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="24"
              height="24"
            >
              <path
                d="M7 8 C7 4, 16 3, 19 6 C22 9, 18 12, 14 13 C10 14, 7 15, 7 18 C7 22, 14 24, 17 22"
                fill="none"
                stroke="var(--accent, #fbbf24)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 24 C25 28, 16 29, 13 26 C10 23, 14 20, 18 19 C22 18, 25 17, 25 14 C25 10, 18 8, 15 10"
                fill="none"
                stroke="var(--accent, #fbbf24)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p
              style={{
                color: "var(--accent)",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Navigate
            </p>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  style={{
                    fontSize: "14px",
                    letterSpacing: "0.025em",
                    color: link.label === "Blog" ? "var(--text)" : "var(--text-secondary)",
                    fontWeight: link.label === "Blog" ? 700 : 400,
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

        {/* Theme toggle - bottom left of nav pane */}
        <div style={{ paddingLeft: "32px", paddingRight: "32px", paddingBottom: "24px" }}>
          <button
            onClick={toggle}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "8px 12px",
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontSize: "12px",
              letterSpacing: "0.025em",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </>
  );
}