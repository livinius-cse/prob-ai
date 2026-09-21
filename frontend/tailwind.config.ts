import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08111f",
        panel: "#0e1a2b",
        forge: "#ff7a45",
      },
      boxShadow: {
        glow: "0 0 80px rgba(255, 122, 69, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
