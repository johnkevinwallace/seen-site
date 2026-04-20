import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnalyticsGate from "@/components/AnalyticsGate";
import Nav from "@/components/Nav";
import FooterGate from "@/components/FooterGate";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seen — Mental Health Advocacy",
  description:
    "Helping others struggling with mental health to be seen. Compassion. Respect. Support.",
  openGraph: {
    title: "Seen — Mental Health Advocacy",
    description: "Mental health advocacy — because everyone deserves to be seen.",
    type: "website",
    url: "https://seenadvocacy.com",
  },
  other: {
    "x-vercel-toolbar": "0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-va="0" data-theme="light">
      <body className={`${inter.className}`} style={{ background: "var(--bg)", color: "var(--text)" }}>
        <ThemeProvider>
          <Nav />
          {children}
          <FooterGate />
        </ThemeProvider>
        <AnalyticsGate />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove Vercel toolbar if present
              const observer = new MutationObserver(() => {
                const toolbar = document.querySelector('[data-testid="vercel-toolbar"]') || document.querySelector('vdt-toolbar');
                if (toolbar) toolbar.remove();
              });
              observer.observe(document.body, { childList: true, subtree: true });
            `,
          }}
        />
      </body>
    </html>
  );
}