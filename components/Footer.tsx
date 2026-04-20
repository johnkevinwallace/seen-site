export default function Footer() {
  return (
    <footer
      style={{
        padding: "32px 24px",
        textAlign: "center",
        borderTop: "1px solid var(--border, #292524)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {/* S logo icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="20"
          height="20"
        >
          <path
            d="M7 8 C7 4, 16 3, 19 6 C22 9, 18 12, 14 13 C10 14, 7 15, 7 18 C7 22, 14 24, 17 22"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25 24 C25 28, 16 29, 13 26 C10 23, 14 20, 18 19 C22 18, 25 17, 25 14 C25 10, 18 8, 15 10"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            color: "#78716c",
            fontSize: "12px",
            letterSpacing: "0.1em",
          }}
        >
          Seen — Mental Health Advocacy
        </span>
      </div>
      <div style={{ marginTop: "8px" }}>
        <span
          style={{
            color: "#57534e",
            fontSize: "11px",
          }}
        >
          © 2026 Seen Advocacy. All rights reserved.
        </span>
      </div>
      <div style={{ marginTop: "4px", display: "flex", justifyContent: "center", gap: "8px" }}>
        <a
          href="/terms"
          style={{
            color: "#57534e",
            fontSize: "11px",
            textDecoration: "none",
          }}
        >
          Terms of Use
        </a>
        <span style={{ color: "#44403c", fontSize: "11px" }}>·</span>
        <a
          href="/privacy"
          style={{
            color: "#57534e",
            fontSize: "11px",
            textDecoration: "none",
          }}
        >
          Privacy Policy
        </a>
      </div>
      <div style={{ marginTop: "4px" }}>
        <a
          href="/contact"
          style={{
            color: "#57534e",
            fontSize: "11px",
            textDecoration: "none",
          }}
        >
          Report a Bug
        </a>
      </div>
    </footer>
  );
}