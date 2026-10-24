/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#111010",
        surface: "#1a1918",
        ink: "#edeae4",
        muted: "#b9b4ac",
        subtle: "#a8a39b",
        label: "#8f8a82",
        faint: "#86817a",
        accent: "#ffc61a",
      },
      fontFamily: {
        sans: ["Archivo", "Arial", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
