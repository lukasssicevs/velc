import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF8",
        surface: "#F2F2EF",
        ink: "#151515",
        muted: "#6E6E6B",
        hairline: "#E6E6E3",
        accent: "#151515",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-plex-mono)"],
        logo: ["var(--font-fraunces)"],
      },
      maxWidth: {
        page: "1080px",
      },
    },
  },
  plugins: [],
};
export default config;
