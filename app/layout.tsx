import type { Metadata } from "next";
import {
  Instrument_Serif,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

// Instrument Serif ships ONE weight (400). Asking for 600 silently renders 400
// rather than erroring, so display headings carry no font-weight class — the
// face's own high contrast does the work, and names are sized up instead.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
  // Next 14 has no built-in metrics for this face, so its automatic
  // metric-matched fallback fails and warns at build. Pin the stack ourselves.
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
  title: "VELC | Product Studio",
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
      className={`${instrumentSerif.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
