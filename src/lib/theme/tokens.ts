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
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    screenPadding: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  touchTarget: {
    min: number;
  };
}

const baseTokens: TokenSet = {
  colors,
  typography: {
    headingSize: 28,
    titleSize: 22,
    bodySize: 16,
    captionSize: 13,
    lineHeightMultiplier: 1.5,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    screenPadding: 20,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    full: 9999,
  },
  touchTarget: {
    min: 44,
  },
};

/** Token overrides per persona */
export const personaTokens: Record<Persona, TokenSet> = {
  casual: baseTokens,
  elder: {
    ...baseTokens,
    typography: {
      headingSize: 36,
      titleSize: 28,
      bodySize: 20,
      captionSize: 16,
      lineHeightMultiplier: 1.7,
    },
    spacing: {
      xs: 6,
      sm: 12,
      md: 20,
      lg: 32,
      xl: 44,
      screenPadding: 24,
    },
    touchTarget: { min: 56 },
  },
  power: {
    ...baseTokens,
    typography: {
      headingSize: 24,
      titleSize: 18,
      bodySize: 14,
      captionSize: 11,
      lineHeightMultiplier: 1.3,
    },
    spacing: {
      xs: 2,
      sm: 4,
      md: 10,
      lg: 16,
      xl: 24,
      screenPadding: 14,
    },
    touchTarget: { min: 36 },
  },
  accessibility: {
    ...baseTokens,
    typography: {
      headingSize: 40,
      titleSize: 32,
      bodySize: 22,
      captionSize: 18,
      lineHeightMultiplier: 1.8,
    },
    spacing: {
      xs: 8,
      sm: 14,
      md: 24,
      lg: 36,
      xl: 48,
      screenPadding: 28,
    },
    touchTarget: { min: 60 },
  },
};
