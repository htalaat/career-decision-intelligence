import React from "react";
import { View, Text } from "react-native";
import { Slider } from "../ui/Slider";
import { Button } from "../ui/Button";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface WeightValues {
  income: number;
  stability: number;
  flexibility: number;
  prestige: number;
  creativity: number;
  impact: number;
  study_duration: number;
  risk: number;
}

interface WeightAdjusterProps {
  weights: WeightValues;
  onWeightChange: (key: string, value: number) => void;
  onReset: () => void;
}

const WEIGHT_LABELS: Array<{ key: keyof WeightValues; label: string }> = [
  { key: "income", label: "Income potential" },
  { key: "stability", label: "Job stability" },
  { key: "flexibility", label: "Flexibility" },
  { key: "prestige", label: "Prestige" },
  { key: "creativity", label: "Creativity" },
  { key: "impact", label: "Social impact" },
  { key: "study_duration", label: "Study duration tolerance" },
  { key: "risk", label: "Risk comfort" },
];

/** Adjustable weight sliders that update comparison rankings in real time */
export function WeightAdjuster({ weights, onWeightChange, onReset }: WeightAdjusterProps) {
  const tokens = useTokens();

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
          Adjust priorities
        </Text>
        <Button label="Reset" variant="ghost" onPress={onReset} />
      </View>
      <View style={{ gap: 14 }}>
        {WEIGHT_LABELS.map(({ key, label }) => (
          <Slider
            key={key}
            label={label}
            value={weights[key]}
            onValueChange={(v) => onWeightChange(key, v)}
            min={0}
            max={100}
            step={5}
          />
        ))}
      </View>
    </View>
  );
}
