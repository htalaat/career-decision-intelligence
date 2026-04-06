import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface FilterBarProps {
  domains: string[];
  selectedDomain: string | null;
  onSelectDomain: (domain: string | null) => void;
}

/** Horizontal scrolling domain filter */
export function FilterBar({ domains, selectedDomain, onSelectDomain }: FilterBarProps) {
  const tokens = useTokens();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
    >
      <Pressable
        onPress={() => onSelectDomain(null)}
        accessibilityLabel="Show all domains"
        accessibilityRole="button"
        style={{
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: selectedDomain === null ? tokens.colors.accent.DEFAULT : tokens.colors.surface.elevated,
        }}
      >
        <Text style={{
          fontSize: tokens.typography.captionSize,
          fontWeight: "600",
          color: selectedDomain === null ? "#FFFFFF" : tokens.colors.text.secondary,
        }}>
          All
        </Text>
      </Pressable>

      {domains.map((domain) => (
        <Pressable
          key={domain}
          onPress={() => onSelectDomain(domain === selectedDomain ? null : domain)}
          accessibilityLabel={`Filter by ${domain}`}
          accessibilityRole="button"
          style={{
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: selectedDomain === domain ? tokens.colors.accent.DEFAULT : tokens.colors.surface.elevated,
          }}
        >
          <Text style={{
            fontSize: tokens.typography.captionSize,
            fontWeight: "600",
            color: selectedDomain === domain ? "#FFFFFF" : tokens.colors.text.secondary,
          }}>
            {domain}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
