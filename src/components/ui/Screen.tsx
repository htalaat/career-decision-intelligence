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
  const padding = padded ? tokens.spacing.screenPadding : 0;

  if (scroll) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: tokens.colors.surface.DEFAULT }}>
        <ScrollView
          style={{ flex: 1, paddingHorizontal: padding }}
          contentContainerStyle={{ paddingBottom: tokens.spacing.xl }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.colors.surface.DEFAULT }}>
      <View style={{ flex: 1, paddingHorizontal: padding }}>{children}</View>
    </SafeAreaView>
  );
}
