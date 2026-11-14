import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        surface: "#111111",
        card: "#171717",
        line: "#292929",
        paper: "#F5F3EF",
        mute: "#A5A5A5",
        gold: "#C6A66B",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
