import React from "react";
import { View, Text, Platform } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/** Interactive labeled slider for priority weighting. Uses native range input on web for reliable touch/drag. */
export function Slider({ label, value, onValueChange, min = 0, max = 100, step = 5 }: SliderProps) {
  const tokens = useTokens();
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <View style={{ gap: 4 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "500", color: tokens.colors.text.primary }}>
          {label}
        </Text>
        <View
          style={{
            backgroundColor: tokens.colors.accent.DEFAULT + "20",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 2,
            minWidth: 40,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "700", color: tokens.colors.accent.DEFAULT }}>
            {value}
          </Text>
        </View>
      </View>

      {Platform.OS === "web" ? (
        <WebSlider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onValueChange}
          accentColor={tokens.colors.accent.DEFAULT}
          trackColor={tokens.colors.surface.elevated}
        />
      ) : (
        <NativeSliderFallback
          value={value}
          min={min}
          max={max}
          percent={percent}
          accentColor={tokens.colors.accent.DEFAULT}
          trackColor={tokens.colors.surface.elevated}
        />
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
          Low priority
        </Text>
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.muted }}>
          High priority
        </Text>
      </View>
    </View>
  );
}

/** Web: uses native HTML range input — supports click, drag, and touch natively */
function WebSlider({
  value,
  min,
  max,
  step,
  onChange,
  accentColor,
  trackColor,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  accentColor: string;
  trackColor: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <View style={{ paddingVertical: 8 }}>
      {/* @ts-ignore — input type=range is web-only */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e: { target: { value: string } }) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          height: 8,
          appearance: "none",
          WebkitAppearance: "none",
          background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percent}%, ${trackColor} ${percent}%, ${trackColor} 100%)`,
          borderRadius: 4,
          outline: "none",
          cursor: "pointer",
          accentColor: accentColor,
        }}
      />
    </View>
  );
}

/** Native fallback: visual-only bar (will be replaced with gesture handler in Phase 2) */
function NativeSliderFallback({
  value,
  min,
  max,
  percent,
  accentColor,
  trackColor,
}: {
  value: number;
  min: number;
  max: number;
  percent: number;
  accentColor: string;
  trackColor: string;
}) {
  return (
    <View style={{ paddingVertical: 8 }}>
      <View
        style={{
          height: 8,
          backgroundColor: trackColor,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${percent}%`,
            backgroundColor: accentColor,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );
}
