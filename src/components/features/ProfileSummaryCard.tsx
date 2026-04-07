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
    <View style={{ gap: 12 }}>
      {items.map((item) => (
        <Card key={item.label}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "500", color: tokens.colors.text.secondary }}>
              {item.label}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
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
