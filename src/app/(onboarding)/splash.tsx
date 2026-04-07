import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/Button";
import { useTokens } from "../../lib/theme/PersonaProvider";
import { useOnboardingStore } from "../../stores/onboardingStore";

/** Step 1: Warm intro — sets the tone */
export default function SplashScreen() {
  const router = useRouter();
  const tokens = useTokens();
  const { nextStep } = useOnboardingStore();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 32 }}>
      <View style={{ gap: 24, alignItems: "center" }}>
        <Text style={{ fontSize: 48 }}>{"\ud83e\udded"}</Text>
        <Text style={{
          fontSize: tokens.typography.headingSize,
          fontWeight: tokens.typography.headingWeight,
          color: tokens.colors.text.primary,
          textAlign: "center",
        }}>
          {"Let's figure out"}{"\n"}what fits you
        </Text>
        <Text style={{
          fontSize: tokens.typography.bodySize,
          color: tokens.colors.text.secondary,
          textAlign: "center",
          lineHeight: tokens.typography.bodySize * 1.6,
        }}>
          No tests. No pressure. No wrong answers.{"\n"}
          Just honest questions to help you{"\n"}find your direction.
        </Text>
      </View>
      <View style={{ width: "100%", paddingTop: 48 }}>
        <Button
          label="Let's go \u2192"
          onPress={() => { nextStep(); router.push("/(onboarding)/welcome" as never); }}
        />
      </View>
    </View>
  );
}
