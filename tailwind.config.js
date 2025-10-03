/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0B3C8A", light: "#1A56B3", dark: "#072A61" },
        accent: { red: "#D51F26", gold: "#D4AF37", silver: "#C0C0C0" }
      },
      fontFamily: {
        sans: ["ui-sans-serif","system-ui","Segoe UI","Roboto","Inter","Arial","Noto Sans","sans-serif"]
      }
    }
  },
  plugins: [],
};
