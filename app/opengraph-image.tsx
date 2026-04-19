import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Seen — Mental Health Advocacy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0a09",
        }}
      >
        {/* S Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="180"
          height="180"
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
        {/* SEEN text */}
        <p
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#fbbf24",
            letterSpacing: "0.1em",
            marginTop: 20,
          }}
        >
          SEEN
        </p>
        {/* Tagline */}
        <p
          style={{
            fontSize: 24,
            color: "#78716c",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          Mental Health Advocacy
        </p>
      </div>
    ),
    { ...size }
  );
}