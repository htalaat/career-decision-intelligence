/**
 * Career Decision Intelligence — Bright, clean, youth-facing color system
 * Light backgrounds with vibrant accent colors
 */
export const colors = {
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
    inverse: "#FFFFFF",
  },
  success: "#00CEC9",
  warning: "#FDCB6E",
  error: "#FF6B6B",
  border: {
    DEFAULT: "#E8EAF0",
    light: "#F0F1F8",
  },
  /** Each direction cluster gets its own accent color */
  clusters: {
    tech_solving: "#6C5CE7",
    business_money: "#0984E3",
    design_create: "#FD79A8",
    health_care: "#00CEC9",
    law_justice: "#E17055",
    media_stories: "#F9A825",
    engineering_build: "#00B894",
    science_research: "#A29BFE",
    startup_create: "#FF6348",
  },
} as const;
