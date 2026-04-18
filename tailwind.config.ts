import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        deep: "#020203",
        base: "#050506",
        elevated: "#0a0a0c",
        surface: "rgba(255, 255, 255, 0.04)",
        "surface-bright": "rgba(255, 255, 255, 0.08)",
        accent: "#5E6AD2",
        "accent-light": "#7B85E0",
        "accent-glow": "rgba(94, 106, 210, 0.2)",
        "accent-subtle": "rgba(94, 106, 210, 0.08)",
        foreground: "#EDEDEF",
        muted: "#8A8F98",
        "muted-dim": "#555960",
        border: "rgba(255, 255, 255, 0.08)",
        "border-bright": "rgba(255, 255, 255, 0.12)",
        emerald: "#34D399",
        amber: "#FBBF24",
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Work Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-sm": ["3.25rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "h1": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "h2": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        "h3": ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "label": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.06em", fontWeight: "500" }],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
