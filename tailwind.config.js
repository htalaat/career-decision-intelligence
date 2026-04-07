/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#121826",
        surface: {
          DEFAULT: "#121826",
          secondary: "#1E2640",
          elevated: "#2A3352",
        },
        accent: {
          DEFAULT: "#6C5CE7",
          light: "#A29BFE",
          muted: "#4834D4",
        },
        teal: "#00CEC9",
        pink: "#FD79A8",
        gold: "#FDCB6E",
        text: {
          primary: "#FFFFFF",
          secondary: "#B2BEC3",
          muted: "#636E72",
        },
        success: "#00CEC9",
        warning: "#FDCB6E",
        error: "#FF6B6B",
        border: "#2D3652",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
    },
  },
  plugins: [],
};
