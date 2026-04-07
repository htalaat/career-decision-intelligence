import React from "react";
import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Privacy and trust notice shown during onboarding */
export function TrustNotice() {
  const tokens = useTokens();

  return (
    <Card>
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: tokens.typography.titleSize, fontWeight: "600", color: tokens.colors.text.primary }}>
          Your privacy matters
        </Text>
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            We collect only what's needed to help you make a decision. Nothing more.
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            Your answers are private to you. We don't share them with employers, universities, or third parties.
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            You can export or delete your data at any time from account settings.
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            No hidden AI decisions. Every recommendation is based on transparent rules you can see.
          </Text>
        </View>
      </View>
    </Card>
  );
}
