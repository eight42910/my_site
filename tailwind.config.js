/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        muted2: "var(--muted2)",
        border: "var(--border)",
        dark: "var(--dark)",
        accentTech: "var(--accent-tech)",
        accentWine: "var(--accent-wine)"
      },
      letterSpacing: {
        tightest: "-0.04em"
      }
    }
  },
  plugins: []
};
