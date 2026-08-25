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
        // --font-display already carries its own fallback stack (set in
        // layout.tsx); repeating it here would duplicate the generics.
        display: ["var(--font-display)"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        page: "1080px",
      },
    },
  },
  plugins: [],
};
export default config;
