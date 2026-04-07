/**
 * Career Decision Intelligence — Youth-facing warm dark color system
 * With vibrant cluster-colored energy accents
 */
export const colors = {
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
    inverse: "#121826",
  },
  success: "#00CEC9",
  warning: "#FDCB6E",
  error: "#FF6B6B",
  border: {
    DEFAULT: "#2D3652",
    light: "#3D4670",
  },
  /** Each direction cluster gets its own accent color */
  clusters: {
    tech_solving: "#6C5CE7",
    business_money: "#0984E3",
    design_create: "#FD79A8",
    health_care: "#00CEC9",
    law_justice: "#E17055",
    media_stories: "#FDCB6E",
    engineering_build: "#00B894",
    science_research: "#A29BFE",
    startup_create: "#FF6348",
  },
} as const;
