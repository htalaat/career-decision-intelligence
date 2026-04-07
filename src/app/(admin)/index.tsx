import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../../components/ui/Screen";
import { Button } from "../../components/ui/Button";
import { useTokens } from "../../lib/theme/PersonaProvider";

/** Admin dashboard with navigation to management screens */
export default function AdminDashboard() {
  const router = useRouter();
  const tokens = useTokens();

  const menuItems = [
    { label: "Career paths", description: "Manage career library and details", route: "/(admin)/career-paths" },
    { label: "Scoring rules", description: "View trait mappings and weights", route: "/(admin)/scoring" },
    { label: "Audit log", description: "View admin actions history", route: "/(admin)/audit" },
    { label: "Seed configuration", description: "View countries, faculties, study direction mappings", route: "/(admin)/config" },
  ];

  return (
    <Screen scroll padded>
      <View style={{ gap: 24, paddingTop: 16 }}>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: tokens.typography.headingSize, fontWeight: "700", color: tokens.colors.text.primary }}>
            Admin console
          </Text>
          <Text style={{ fontSize: tokens.typography.bodySize, color: tokens.colors.text.secondary }}>
            Manage career content, scoring, and audit trail.
          </Text>
        </View>

        <View style={{ gap: 12 }}>
          {menuItems.map((item) => (
            <Button
              key={item.route}
              label={item.label}
              variant="secondary"
              onPress={() => router.push(item.route as never)}
            />
          ))}
        </View>

        <Button label="Back to app" variant="ghost" onPress={() => router.push("/(tabs)")} />
      </View>
    </Screen>
  );
}
