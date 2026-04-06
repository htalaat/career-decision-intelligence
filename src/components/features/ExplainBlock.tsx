import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface ExplainBlockProps {
  topPositives: string[];
  topNegatives: string[];
  missingInfo: string[];
  validationQuestions: string[];
}

/** Expandable "Why this score" explanation block */
export function ExplainBlock({ topPositives, topNegatives, missingInfo, validationQuestions }: ExplainBlockProps) {
  const tokens = useTokens();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{
      backgroundColor: tokens.colors.surface.secondary,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: tokens.colors.border.DEFAULT,
      overflow: "hidden",
    }}>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        accessibilityLabel={expanded ? "Collapse explanation" : "Expand explanation"}
        accessibilityRole="button"
        style={{ padding: tokens.spacing.md, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
      >
        <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "600", color: tokens.colors.text.primary }}>
          Why this score
        </Text>
        <Text style={{ fontSize: 18, color: tokens.colors.text.muted }}>
          {expanded ? "−" : "+"}
        </Text>
      </Pressable>

      {expanded && (
        <View style={{ paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.md, gap: 16 }}>
          {topPositives.length > 0 && (
            <ExplainSection title="Strengths" items={topPositives} color={tokens.colors.success} prefix="+" tokens={tokens} />
          )}
          {topNegatives.length > 0 && (
            <ExplainSection title="Concerns" items={topNegatives} color={tokens.colors.warning} prefix="-" tokens={tokens} />
          )}
          {missingInfo.length > 0 && (
            <ExplainSection title="Missing information" items={missingInfo} color={tokens.colors.text.muted} prefix="?" tokens={tokens} />
          )}
          {validationQuestions.length > 0 && (
            <ExplainSection title="Questions to explore" items={validationQuestions} color={tokens.colors.accent.DEFAULT} prefix=">" tokens={tokens} />
          )}
        </View>
      )}
    </View>
  );
}

function ExplainSection({
  title,
  items,
  color,
  prefix,
  tokens,
}: {
  title: string;
  items: string[];
  color: string;
  prefix: string;
  tokens: ReturnType<typeof useTokens>;
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "600", color }}>
        {title}
      </Text>
      {items.map((item, i) => (
        <Text key={i} style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary, paddingLeft: 8 }}>
          {prefix} {item}
        </Text>
      ))}
    </View>
  );
}
