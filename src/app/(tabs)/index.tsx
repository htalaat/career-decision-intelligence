import React from "react";
import { View, Text } from "react-native";
import { Screen } from "../../components/ui/Screen";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Dashboard home — placeholder for Phase 1 */
export default function DashboardScreen() {
  const tokens = useTokens();

  return (
    <Screen padded>
      <View className="flex-1 justify-center items-center gap-4">
        <Text className="text-text-primary font-bold text-center" style={{ fontSize: tokens.typography.headingSize }}>
          Welcome
        </Text>
        <Text className="text-text-secondary text-center" style={{ fontSize: tokens.typography.bodySize }}>
          Your dashboard will appear here after onboarding.
        </Text>
      </View>
    </Screen>
  );
}
