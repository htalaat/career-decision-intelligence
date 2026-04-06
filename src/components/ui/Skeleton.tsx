import React from "react";
import { View, type DimensionValue } from "react-native";
import { MotiView } from "moti";

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  rounded?: boolean;
}

/** Animated loading placeholder */
export function Skeleton({ width = "100%", height = 20, rounded = false }: SkeletonProps) {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 0.7 }}
      transition={{ loop: true, type: "timing", duration: 800 }}
      className={`bg-surface-elevated ${rounded ? "rounded-full" : "rounded-lg"}`}
      style={{ width, height }}
    />
  );
}
