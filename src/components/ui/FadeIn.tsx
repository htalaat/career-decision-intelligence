import React from "react";
import { MotiView } from "moti";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "none";
}

/** Fade-in animation on mount with optional direction */
export function FadeIn({ children, delay = 0, direction = "up" }: FadeInProps) {
  const translateY = direction === "up" ? 16 : direction === "down" ? -16 : 0;

  return (
    <MotiView
      from={{ opacity: 0, translateY }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 400,
        delay,
      }}
    >
      {children}
    </MotiView>
  );
}
