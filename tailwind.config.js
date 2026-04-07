/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F7F8FC",
        surface: {
          DEFAULT: "#F7F8FC",
          secondary: "#FFFFFF",
          elevated: "#F0F1F8",
        },
        accent: {
          DEFAULT: "#6C5CE7",
          light: "#A29BFE",
          muted: "#EDE9FE",
        },
        teal: "#00CEC9",
        pink: "#FD79A8",
        gold: "#FDCB6E",
        text: {
          primary: "#1A1A2E",
          secondary: "#636E72",
          muted: "#B2BEC3",
        },
        success: "#00CEC9",
        warning: "#FDCB6E",
        error: "#FF6B6B",
        border: "#E8EAF0",
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
