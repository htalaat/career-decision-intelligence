import React, { useState, useMemo } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
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

/** Type-to-filter searchable select with radio indicators */
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
    if (!search.trim()) return options.slice(0, 12);
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 15);
  }, [search, options]);

  return (
    <View style={{ gap: 10 }}>
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
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: tokens.typography.bodySize,
          color: tokens.colors.text.primary,
          minHeight: tokens.touchTarget.min,
        }}
      />

      {/* Selected state */}
      {value && !search && (
        <Pressable onPress={() => { onSelect(""); setSearch(""); }}>
          <View style={{
            display: "flex" as never,
            flexDirection: "row" as never,
            alignItems: "center" as never,
            gap: 8,
          }}>
            <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.accent.DEFAULT, fontWeight: "600" }}>
              ✓ {selectedLabel}
            </Text>
            <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>— tap to change</Text>
          </View>
        </Pressable>
      )}

      {/* Pinned options */}
      {pinnedOptions.length > 0 && !search && !value && (
        <View style={{ gap: 6 }}>
          {pinnedOptions.map((opt) => (
            <Pressable key={opt.value} onPress={() => { onSelect(opt.value); setSearch(""); }}>
              <View style={{
                backgroundColor: tokens.colors.accent.muted,
                borderRadius: 14,
                padding: 14,
                minHeight: tokens.touchTarget.min,
                display: "flex" as never,
                flexDirection: "row" as never,
                alignItems: "center" as never,
              }}>
                <View style={{
                  width: 22, height: 22, borderRadius: 11, borderWidth: 2,
                  borderColor: tokens.colors.accent.DEFAULT, backgroundColor: "transparent",
                  marginRight: 12, flexShrink: 0,
                }} />
                <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "500", color: tokens.colors.accent.DEFAULT, flexShrink: 1 }}>
                  {opt.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      {/* Filtered results — NO nested ScrollView, parent OnboardingQuestion handles scroll */}
      {(search.trim() || (!value && pinnedOptions.length === 0)) && (
        <View style={{ gap: 6 }}>
          {filtered.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <Pressable key={opt.value} onPress={() => { onSelect(opt.value); setSearch(""); }}>
                <View style={{
                  backgroundColor: isSelected ? tokens.colors.accent.muted : tokens.colors.surface.secondary,
                  borderRadius: 14,
                  borderWidth: 2,
                  borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                  paddingLeft: 14,
                  paddingRight: 16,
                  paddingTop: 12,
                  paddingBottom: 12,
                  minHeight: 48,
                  display: "flex" as never,
                  flexDirection: "row" as never,
                  alignItems: "center" as never,
                }}>
                  {/* Radio circle */}
                  <View style={{
                    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
                    borderColor: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.border.DEFAULT,
                    backgroundColor: isSelected ? tokens.colors.accent.DEFAULT : "transparent",
                    alignItems: "center", justifyContent: "center",
                    marginRight: 12, flexShrink: 0,
                  }}>
                    {isSelected && (
                      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#FFFFFF" }} />
                    )}
                  </View>
                  <Text style={{
                    fontSize: tokens.typography.bodySize,
                    fontWeight: isSelected ? "600" : "400",
                    color: isSelected ? tokens.colors.accent.DEFAULT : tokens.colors.text.primary,
                    flexShrink: 1,
                  }}>
                    {opt.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
          {filtered.length === 0 && (
            <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted, padding: 12, textAlign: "center" }}>
              No matches found
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
