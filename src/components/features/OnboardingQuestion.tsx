import React from "react";
import { View, Text } from "react-native";
import { Button } from "../ui/Button";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface OnboardingQuestionProps {
  question: string;
  hint?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

/** Reusable wrapper for each onboarding step */
export function OnboardingQuestion({
  question,
  hint,
  children,
  onNext,
  onBack,
  nextDisabled = false,
  nextLabel = "Continue",
}: OnboardingQuestionProps) {
  const tokens = useTokens();

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View style={{ gap: 24, flex: 1 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            {question}
          </Text>
          {hint && (
            <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
              {hint}
            </Text>
          )}
        </View>
        <View style={{ flex: 1 }}>{children}</View>
      </View>
      <View style={{ gap: 12, paddingTop: 16 }}>
        <Button label={nextLabel} onPress={onNext} disabled={nextDisabled} />
        {onBack && <Button label="Back" variant="ghost" onPress={onBack} />}
      </View>
    </View>
  );
}
