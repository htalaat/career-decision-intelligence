import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Public landing / welcome page */
export default function LandingScreen() {
  const router = useRouter();
  const tokens = useTokens();

  return (
    <Screen padded>
      <View className="flex-1 justify-center gap-8">
        <View className="gap-4">
          <Text
            className="font-bold text-center"
            style={{ fontSize: tokens.typography.headingSize, color: tokens.colors.text.primary }}
          >
            Career Decision Intelligence
          </Text>
          <Text
            className="text-center"
            style={{
              fontSize: tokens.typography.bodySize,
              lineHeight: tokens.typography.bodySize * tokens.typography.lineHeightMultiplier,
              color: tokens.colors.text.secondary,
            }}
          >
            Move from career uncertainty to a structured, defensible decision.{"\n"}
            No guesswork. No vague advice. Just clarity.
          </Text>
        </View>
        <View className="gap-3">
          <Button label="Get started" onPress={() => router.push("/(auth)/sign-in")} />
          <Button label="I already have an account" variant="ghost" onPress={() => router.push("/(auth)/sign-in")} />
        </View>
      </View>
    </Screen>
  );
}
