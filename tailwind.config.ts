import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      maxWidth: { "screen-xl": "1400px" },
      colors: {
        ink: "#2E2A6B",       // primary — indigo ink
        pine: "#1F6F5C",      // secondary — teal pine
        trail: "#E8973D",     // accent — amber trail
        paper: "#F6F4EE",     // neutral light surface
        charcoal: "#15171C",  // neutral dark surface
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(21,23,28,0.04), 0 8px 24px -8px rgba(21,23,28,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
