/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.jsx"
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FCF9F0",
        basalt: "#1A1A1A",
        saffron: "#AF835E",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
