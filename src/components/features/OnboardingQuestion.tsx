import React from "react";
import { View, Text, ScrollView, Platform } from "react-native";
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

/**
 * Reusable onboarding step wrapper.
 * Question + hint at top, scrollable content in middle, fixed buttons at bottom.
 */
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
    <View style={{
      flex: 1,
      display: "flex" as never,
      flexDirection: "column" as never,
    }}>
      {/* Scrollable content area */}
      <View style={{
        flex: 1,
        overflow: "scroll" as never,
        ...(Platform.OS === "web" ? { overflowY: "auto" as never, WebkitOverflowScrolling: "touch" as never } : {}),
      }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          {/* Question header */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{
              fontSize: tokens.typography.titleSize,
              fontWeight: tokens.typography.titleWeight,
              color: tokens.colors.text.primary,
              marginBottom: 6,
            }}>
              {question}
            </Text>
            {hint && (
              <Text style={{
                fontSize: tokens.typography.captionSize,
                color: tokens.colors.text.secondary,
                lineHeight: tokens.typography.captionSize * 1.5,
              }}>
                {hint}
              </Text>
            )}
          </View>

          {/* Content area */}
          {children}
        </ScrollView>
      </View>

      {/* Fixed buttons at bottom */}
      <View style={{
        paddingTop: 12,
        paddingBottom: 8,
        backgroundColor: tokens.colors.surface.DEFAULT,
        borderTopWidth: 1,
        borderTopColor: tokens.colors.border.DEFAULT,
        flexShrink: 0,
      }}>
        <Button label={nextLabel} onPress={onNext} disabled={nextDisabled} />
        {onBack && (
          <View style={{ marginTop: 8 }}>
            <Button label="Back" variant="ghost" onPress={onBack} />
          </View>
        )}
      </View>
    </View>
  );
}
