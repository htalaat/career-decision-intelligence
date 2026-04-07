import React from "react";
import { View, type DimensionValue } from "react-native";
import { MotiView } from "moti";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  rounded?: boolean;
}

/** Animated loading placeholder */
export function Skeleton({ width = "100%", height = 20, rounded = false }: SkeletonProps) {
  const tokens = useTokens();

  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 0.7 }}
      transition={{ loop: true, type: "timing", duration: 800 }}
      style={{
        width,
        height,
        backgroundColor: tokens.colors.surface.elevated,
        borderRadius: rounded ? tokens.borderRadius.full : tokens.borderRadius.sm,
      }}
    />
  );
}
