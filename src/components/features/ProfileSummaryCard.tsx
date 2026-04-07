import React from "react";
import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface SummaryItem {
  label: string;
  values: string[];
}

interface ProfileSummaryCardProps {
  items: SummaryItem[];
}

/** Read-only summary of user's profile inputs */
export function ProfileSummaryCard({ items }: ProfileSummaryCardProps) {
  const tokens = useTokens();

  return (
    <View className="gap-3">
      {items.map((item) => (
        <Card key={item.label}>
          <View className="gap-2">
            <Text className="font-medium" style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
              {item.label}
            </Text>
            <View className="flex-row flex-wrap gap-1.5">
              {item.values.map((v) => (
                <Badge key={v} label={v} variant="accent" />
              ))}
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
}
