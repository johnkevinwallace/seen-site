import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seen — Mental Health Advocacy",
  description:
    "Helping others struggling with mental health to be seen. Compassion. Respect. Support.",
  openGraph: {
    title: "Seen",
    description: "Mental health advocacy — because everyone deserves to be seen.",
    type: "website",
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
    <html lang="en" data-va="0">
      <body className={`${inter.className} bg-stone-950 text-stone-100`}>
        {children}
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