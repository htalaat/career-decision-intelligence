import { colors } from "./colors";

/** Persona identifiers supported by the app */
export type Persona = "casual" | "elder" | "power" | "accessibility";

interface TokenSet {
  colors: typeof colors;
  typography: {
    headingSize: number;
    titleSize: number;
    bodySize: number;
    captionSize: number;
    lineHeightMultiplier: number;
    headingWeight: "700" | "800" | "900";
    titleWeight: "600" | "700" | "800";
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    screenPadding: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  touchTarget: {
    min: number;
  };
}

/** Youth-facing base tokens — larger type, more spacing, rounder everything */
const baseTokens: TokenSet = {
  colors,
  typography: {
    headingSize: 32,
    titleSize: 24,
    bodySize: 18,
    captionSize: 14,
    lineHeightMultiplier: 1.5,
    headingWeight: "800",
    titleWeight: "700",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    screenPadding: 20,
  },
  borderRadius: {
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
    full: 9999,
  },
  touchTarget: {
    min: 52,
  },
};

/** Token overrides per persona */
export const personaTokens: Record<Persona, TokenSet> = {
  casual: baseTokens,
  elder: {
    ...baseTokens,
    typography: {
      headingSize: 40,
      titleSize: 30,
      bodySize: 22,
      captionSize: 17,
      lineHeightMultiplier: 1.7,
      headingWeight: "800",
      titleWeight: "700",
    },
    spacing: {
      xs: 6,
      sm: 12,
      md: 20,
      lg: 32,
      xl: 44,
      xxl: 56,
      screenPadding: 24,
    },
    touchTarget: { min: 60 },
  },
  power: {
    ...baseTokens,
    typography: {
      headingSize: 26,
      titleSize: 20,
      bodySize: 16,
      captionSize: 13,
      lineHeightMultiplier: 1.3,
      headingWeight: "700",
      titleWeight: "600",
    },
    spacing: {
      xs: 3,
      sm: 6,
      md: 12,
      lg: 20,
      xl: 28,
      xxl: 40,
      screenPadding: 16,
    },
    touchTarget: { min: 40 },
  },
  accessibility: {
    ...baseTokens,
    typography: {
      headingSize: 44,
      titleSize: 34,
      bodySize: 24,
      captionSize: 19,
      lineHeightMultiplier: 1.8,
      headingWeight: "800",
      titleWeight: "700",
    },
    spacing: {
      xs: 8,
      sm: 14,
      md: 24,
      lg: 36,
      xl: 48,
      xxl: 64,
      screenPadding: 28,
    },
    touchTarget: { min: 64 },
  },
};
