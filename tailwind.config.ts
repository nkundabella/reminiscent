import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        essence: {
          pink: "#ff6bb3",
          green: "#d4ed31",
          blue: "#b2d1f7",
          cream: "#fbf8f1",
          dark: "#1e1e24",
          background: "var(--essence-background)",
          foreground: "var(--essence-foreground)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-instrument)", "serif"],
      }
    },
  },
  plugins: [],
};
export default config;
