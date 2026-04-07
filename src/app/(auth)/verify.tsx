import React from "react";
import { View, Text } from "react-native";
import { Screen } from "../../components/ui/Screen";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Waiting screen after magic link is sent */
export default function VerifyScreen() {
  const tokens = useTokens();

  return (
    <Screen padded>
      <View className="flex-1 justify-center items-center gap-6">
        <Text className="font-bold text-center" style={{ fontSize: tokens.typography.headingSize, color: tokens.colors.text.primary }}>
          Check your email
        </Text>
        <Text
          className="text-center"
          style={{ fontSize: tokens.typography.bodySize, lineHeight: tokens.typography.bodySize * tokens.typography.lineHeightMultiplier, color: tokens.colors.text.secondary }}
        >
          We sent you a secure sign-in link.{"\n"}Click it to continue.
        </Text>
        <Text className="text-center" style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
          Didn't get it? Check your spam folder.
        </Text>
      </View>
    </Screen>
  );
}
