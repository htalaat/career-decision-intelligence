import React from "react";
import { Text } from "react-native";
import { MotiView } from "moti";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ProgressCelebrationProps {
  show: boolean;
  message?: string;
}

/** Brief celebration animation between onboarding steps */
export function ProgressCelebration({ show, message = "Nice! ✨" }: ProgressCelebrationProps) {
  const tokens = useTokens();

  if (!show) return null;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
      style={{
        position: "absolute",
        top: "40%",
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Text style={{
        fontSize: 24,
        fontWeight: "700",
        color: tokens.colors.gold,
        textAlign: "center",
      }}>
        {message}
      </Text>
    </MotiView>
  );
}
