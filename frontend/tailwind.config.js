/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#faf5f0",
        secondary: "#ede8e2",
        accent: "#a0826d",
        accent-light: "#c4a084",
        neon: "#8b7355",
        warm: "#9d7e6f",
        dark: "#3d3430",
        text-dark: "#2d2420",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh": "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23a0826d%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
      boxShadow: {
        "glow": "0 0 30px rgba(160, 130, 109, 0.15)",
        "glow-neon": "0 0 30px rgba(139, 115, 85, 0.15)",
        "glass": "0 8px 32px 0 rgba(160, 130, 109, 0.1)",
      },
      backdropBlur: {
        "glass": "10px",
      },
    },
  },
  plugins: [],
}
