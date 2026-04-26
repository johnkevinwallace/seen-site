import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import AnalyticsGate from "@/components/AnalyticsGate";
import Nav from "@/components/Nav";
import FooterGate from "@/components/FooterGate";
import ViewportFix from "@/components/ViewportFix";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-va="0" data-theme="light" suppressHydrationWarning>
      <body className={`${inter.className}`} style={{ background: "var(--bg)", color: "var(--text)" }}>
        <ViewportFix />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("seen-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
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
