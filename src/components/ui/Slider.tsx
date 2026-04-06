import React, { useRef, useCallback } from "react";
import { View, Text, Pressable, type GestureResponderEvent, type LayoutChangeEvent } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/** Interactive labeled slider for priority weighting */
export function Slider({ label, value, onValueChange, min = 0, max = 100, step = 5 }: SliderProps) {
  const tokens = useTokens();
  const percent = ((value - min) / (max - min)) * 100;
  const trackWidth = useRef(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    trackWidth.current = e.nativeEvent.layout.width;
  }, []);

  const handlePress = useCallback(
    (e: GestureResponderEvent) => {
      if (trackWidth.current <= 0) return;
      const x = e.nativeEvent.locationX;
      const ratio = Math.max(0, Math.min(1, x / trackWidth.current));
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      const clamped = Math.max(min, Math.min(max, stepped));
      onValueChange(clamped);
    },
    [min, max, step, onValueChange],
  );

  /** Decrement button */
  const decrement = useCallback(() => {
    onValueChange(Math.max(min, value - step));
  }, [value, min, step, onValueChange]);

  /** Increment button */
  const increment = useCallback(() => {
    onValueChange(Math.min(max, value + step));
  }, [value, max, step, onValueChange]);

  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "500", color: tokens.colors.text.primary }}>
          {label}
        </Text>
        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.accent.DEFAULT }}>
          {value}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Pressable
          onPress={decrement}
          accessibilityLabel={`Decrease ${label}`}
          accessibilityRole="button"
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: tokens.colors.surface.elevated,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: tokens.colors.text.primary, fontSize: 18, fontWeight: "700" }}>-</Text>
        </Pressable>

        <Pressable
          onPress={handlePress}
          onLayout={onLayout}
          accessibilityLabel={`${label} slider, value ${value}`}
          accessibilityRole="adjustable"
          style={{
            flex: 1,
            height: 28,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 10,
              backgroundColor: tokens.colors.surface.elevated,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${percent}%`,
                backgroundColor: tokens.colors.accent.DEFAULT,
                borderRadius: 5,
              }}
            />
          </View>
        </Pressable>

        <Pressable
          onPress={increment}
          accessibilityLabel={`Increase ${label}`}
          accessibilityRole="button"
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: tokens.colors.surface.elevated,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: tokens.colors.text.primary, fontSize: 18, fontWeight: "700" }}>+</Text>
        </Pressable>
      </View>

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
