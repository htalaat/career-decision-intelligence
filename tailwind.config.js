/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0F1419",
          secondary: "#1A1F26",
          elevated: "#242B33",
        },
        accent: {
          DEFAULT: "#4F8CFF",
          muted: "#3A6BD4",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#A0A8B4",
          muted: "#6B7280",
        },
        success: "#34D399",
        warning: "#FBBF24",
        error: "#F87171",
        border: "#2D3540",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
