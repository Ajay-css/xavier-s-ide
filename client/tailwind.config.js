/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { bg: "#0b1020" },
      boxShadow: { soft: "0 6px 18px rgba(2,6,23,0.6)" }
    }
  },
  plugins: []
};