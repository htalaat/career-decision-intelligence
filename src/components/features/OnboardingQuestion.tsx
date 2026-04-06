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
    <View className="flex-1 justify-between">
      <View className="gap-6 flex-1">
        <View className="gap-2">
          <Text className="text-text-primary font-bold" style={{ fontSize: tokens.typography.titleSize }}>
            {question}
          </Text>
          {hint && (
            <Text className="text-text-muted" style={{ fontSize: tokens.typography.captionSize }}>
              {hint}
            </Text>
          )}
        </View>
        <View className="flex-1">{children}</View>
      </View>
      <View className="gap-3 pt-4">
        <Button label={nextLabel} onPress={onNext} disabled={nextDisabled} />
        {onBack && <Button label="Back" variant="ghost" onPress={onBack} />}
      </View>
    </View>
  );
}
