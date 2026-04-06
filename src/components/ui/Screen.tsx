import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
}

/** Safe-area screen wrapper with persona-aware background */
export function Screen({ children, scroll = false, padded = true }: ScreenProps) {
  const tokens = useTokens();
  const paddingClass = padded ? "px-5" : "";

  if (scroll) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: tokens.colors.surface.DEFAULT }}>
        <ScrollView
          className={`flex-1 ${paddingClass}`}
          contentContainerStyle={{ paddingBottom: tokens.spacing.xl }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: tokens.colors.surface.DEFAULT }}>
      <View className={`flex-1 ${paddingClass}`}>{children}</View>
    </SafeAreaView>
  );
}
