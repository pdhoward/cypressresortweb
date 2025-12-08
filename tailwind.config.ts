/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        accent: {
          DEFAULT: "#a37d4c", // your gold
          hover: "#967142",
        },
        cypressGold: "#a37d4c",
      },
      fontFamily: {
        sentient: ["Sentient", "sans-serif"],
        mono: ["var(--font-mono)"], // this picks up Geist Mono via next/font
      },
      container: {
        padding: {
          DEFAULT: "15px",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1140px",
      },
    },
  },
  plugins: [],
};
