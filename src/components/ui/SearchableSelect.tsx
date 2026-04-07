import React, { useState, useMemo } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  options: SearchableSelectOption[];
  value: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  pinnedOptions?: SearchableSelectOption[];
}

/** Type-to-filter searchable dropdown */
export function SearchableSelect({
  label,
  options,
  value,
  onSelect,
  placeholder = "Type to search...",
  pinnedOptions = [],
}: SearchableSelectProps) {
  const tokens = useTokens();
  const [search, setSearch] = useState("");

  const selectedLabel = [...pinnedOptions, ...options].find((o) => o.value === value)?.label;

  const filtered = useMemo(() => {
    if (!search.trim()) return options.slice(0, 15);
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 20);
  }, [search, options]);

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "500", color: tokens.colors.text.secondary }}>
        {label}
      </Text>

      {/* Search input */}
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={selectedLabel ?? placeholder}
        placeholderTextColor={selectedLabel ? tokens.colors.text.primary : tokens.colors.text.muted}
        accessibilityLabel={label}
        style={{
          backgroundColor: tokens.colors.surface.secondary,
          borderWidth: 2,
          borderColor: value ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
          borderRadius: tokens.borderRadius.md,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: tokens.typography.bodySize,
          color: tokens.colors.text.primary,
          minHeight: tokens.touchTarget.min,
        }}
      />

      {/* Selected indicator */}
      {value && !search && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.accent.DEFAULT, fontWeight: "600" }}>
            ✓ {selectedLabel}
          </Text>
          <Pressable onPress={() => { onSelect(""); setSearch(""); }}>
            <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>Change</Text>
          </Pressable>
        </View>
      )}

      {/* Pinned options (always visible) */}
      {pinnedOptions.length > 0 && !search && !value && (
        <View style={{ gap: 6 }}>
          {pinnedOptions.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => { onSelect(opt.value); setSearch(""); }}
              style={{
                backgroundColor: tokens.colors.accent.muted,
                borderRadius: tokens.borderRadius.md,
                padding: 12,
                minHeight: tokens.touchTarget.min,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "500", color: tokens.colors.accent.DEFAULT }}>
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* Filtered results */}
      {(search.trim() || (!value && pinnedOptions.length === 0)) && (
        <ScrollView style={{ maxHeight: 250 }} nestedScrollEnabled>
          <View style={{ gap: 4 }}>
            {filtered.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => { onSelect(opt.value); setSearch(""); }}
                  style={{
                    backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                    borderRadius: tokens.borderRadius.sm,
                    borderWidth: 1,
                    borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                    padding: 12,
                    minHeight: 44,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{
                    fontSize: tokens.typography.bodySize,
                    fontWeight: isSelected ? "600" : "400",
                    color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                  }}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
            {filtered.length === 0 && (
              <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted, padding: 12, textAlign: "center" }}>
                No matches found
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
