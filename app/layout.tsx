import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
  // Next 14 has no built-in metrics for Newsreader, so its automatic
  // metric-matched fallback fails and warns at build. Pin the fallback
  // stack ourselves instead of shipping an unadjusted one.
  adjustFontFallback: false,
  fallback: ["Iowan Old Style", "Palatino", "Georgia", "serif"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "VELC — Products built and shipped",
  description:
    "Two people, no layers. One builds, one runs the client side. Whole products, taken from an idea to something real people use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
