import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";
import type { ScoredPath } from "../../lib/engine/types";

interface CompareTableProps {
  paths: ScoredPath[];
}

interface RowDef {
  label: string;
  getValue: (p: ScoredPath) => string | number;
  format?: "score" | "text" | "list";
}

const SCORE_ROWS: RowDef[] = [
  { label: "Overall fit", getValue: (p) => p.overallScore, format: "score" },
  { label: "Interest fit", getValue: (p) => p.breakdown.interestFit, format: "score" },
  { label: "Strength fit", getValue: (p) => p.breakdown.strengthFit, format: "score" },
  { label: "Values alignment", getValue: (p) => p.breakdown.valuesFit, format: "score" },
  { label: "Work-style fit", getValue: (p) => p.breakdown.workstyleFit, format: "score" },
  { label: "Goals alignment", getValue: (p) => p.breakdown.goalsFit, format: "score" },
  { label: "Feasibility", getValue: (p) => p.breakdown.feasibilityFit, format: "score" },
  { label: "Education fit", getValue: (p) => p.breakdown.educationFit, format: "score" },
  { label: "Country fit", getValue: (p) => p.breakdown.countryFit, format: "score" },
];

/** True side-by-side comparison table for 2-5 career paths */
export function CompareTable({ paths }: CompareTableProps) {
  const tokens = useTokens();
  const colWidth = Math.max(160, 280 / paths.length);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View style={{ minWidth: "100%" }}>
        {/* Header row: career titles */}
        <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: tokens.colors.border.DEFAULT, paddingBottom: 12, marginBottom: 8 }}>
          <View style={{ width: 120 }} />
          {paths.map((p) => (
            <View key={p.careerPathId} style={{ width: colWidth, paddingHorizontal: 6 }}>
              <Text style={{ fontSize: tokens.typography.bodySize, fontWeight: "700", color: tokens.colors.text.primary }} numberOfLines={2}>
                {p.title}
              </Text>
              <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>
                {p.domain}
              </Text>
            </View>
          ))}
        </View>

        {/* Section: Scores */}
        <SectionHeader label="Fit scores" tokens={tokens} />
        {SCORE_ROWS.map((row) => (
          <ScoreRow key={row.label} row={row} paths={paths} colWidth={colWidth} tokens={tokens} />
        ))}

        {/* Section: Study direction */}
        <SectionHeader label="Study direction" tokens={tokens} />
        <TextRow
          label="Suggested faculty"
          paths={paths}
          colWidth={colWidth}
          tokens={tokens}
          getValue={(p) => p.explanation.suggestedFaculty ?? "\u2014"}
        />
        <TextRow
          label="Suggested degree"
          paths={paths}
          colWidth={colWidth}
          tokens={tokens}
          getValue={(p) => p.explanation.suggestedDegree ?? "\u2014"}
        />
        <TextRow
          label="What to study"
          paths={paths}
          colWidth={colWidth}
          tokens={tokens}
          getValue={(p) => p.explanation.whatToStudy ?? "\u2014"}
        />

        {/* Section: Risks & blockers */}
        <SectionHeader label="Risks & considerations" tokens={tokens} />
        <ListRow
          label="Watch-outs"
          paths={paths}
          colWidth={colWidth}
          tokens={tokens}
          getValue={(p) => p.explanation.topNegatives}
        />
        <ListRow
          label="What may block"
          paths={paths}
          colWidth={colWidth}
          tokens={tokens}
          getValue={(p) => p.explanation.whatMayBlock}
        />

        {/* Section: Validation */}
        <SectionHeader label="What to verify next" tokens={tokens} />
        <ListRow
          label="Questions"
          paths={paths}
          colWidth={colWidth}
          tokens={tokens}
          getValue={(p) => p.explanation.validationQuestions.slice(0, 2)}
        />

        {/* Section: Why it fits */}
        <SectionHeader label="Why it fits" tokens={tokens} />
        <ListRow
          label="Top reasons"
          paths={paths}
          colWidth={colWidth}
          tokens={tokens}
          getValue={(p) => p.explanation.topPositives.slice(0, 3)}
        />
      </View>
    </ScrollView>
  );
}

/** Section header row */
function SectionHeader({ label, tokens }: { label: string; tokens: ReturnType<typeof useTokens> }) {
  return (
    <View style={{ paddingVertical: 10, marginTop: 8, borderBottomWidth: 1, borderBottomColor: tokens.colors.border.DEFAULT }}>
      <Text style={{ fontSize: tokens.typography.captionSize, fontWeight: "700", color: tokens.colors.accent.DEFAULT, textTransform: "uppercase", letterSpacing: 1 }}>
        {label}
      </Text>
    </View>
  );
}

/** Numeric score row with bar chart and highlight for best value */
function ScoreRow({
  row,
  paths,
  colWidth,
  tokens,
}: {
  row: RowDef;
  paths: ScoredPath[];
  colWidth: number;
  tokens: ReturnType<typeof useTokens>;
}) {
  const values = paths.map((p) => Number(row.getValue(p)));
  const maxVal = Math.max(...values);

  return (
    <View style={{ flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: tokens.colors.surface.elevated }}>
      <View style={{ width: 120, justifyContent: "center" }}>
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
          {row.label}
        </Text>
      </View>
      {paths.map((p, i) => {
        const val = values[i] ?? 0;
        const isMax = val === maxVal && paths.length > 1;
        const color = val >= 70 ? tokens.colors.success : val >= 50 ? tokens.colors.warning : tokens.colors.error;

        return (
          <View key={p.careerPathId} style={{ width: colWidth, paddingHorizontal: 6 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <View style={{ flex: 1, height: 6, backgroundColor: tokens.colors.surface.elevated, borderRadius: 3, overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${Math.min(100, val)}%`, backgroundColor: color, borderRadius: 3 }} />
              </View>
              <Text style={{
                fontSize: 12,
                fontWeight: isMax ? "700" : "500",
                color: isMax ? color : tokens.colors.text.muted,
                minWidth: 30,
                textAlign: "right",
              }}>
                {val}%
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

/** Single-line text row */
function TextRow({
  label,
  paths,
  colWidth,
  tokens,
  getValue,
}: {
  label: string;
  paths: ScoredPath[];
  colWidth: number;
  tokens: ReturnType<typeof useTokens>;
  getValue: (p: ScoredPath) => string;
}) {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: tokens.colors.surface.elevated }}>
      <View style={{ width: 120, justifyContent: "center" }}>
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
          {label}
        </Text>
      </View>
      {paths.map((p) => (
        <View key={p.careerPathId} style={{ width: colWidth, paddingHorizontal: 6 }}>
          <Text style={{ fontSize: 12, color: tokens.colors.text.primary, lineHeight: 16 }} numberOfLines={4}>
            {getValue(p)}
          </Text>
        </View>
      ))}
    </View>
  );
}

/** Bulleted list row for arrays of strings */
function ListRow({
  label,
  paths,
  colWidth,
  tokens,
  getValue,
}: {
  label: string;
  paths: ScoredPath[];
  colWidth: number;
  tokens: ReturnType<typeof useTokens>;
  getValue: (p: ScoredPath) => string[];
}) {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: tokens.colors.surface.elevated }}>
      <View style={{ width: 120, justifyContent: "center" }}>
        <Text style={{ fontSize: tokens.typography.captionSize, color: tokens.colors.text.secondary }}>
          {label}
        </Text>
      </View>
      {paths.map((p) => {
        const items = getValue(p);
        return (
          <View key={p.careerPathId} style={{ width: colWidth, paddingHorizontal: 6, gap: 2 }}>
            {items.length === 0 ? (
              <Text style={{ fontSize: 11, color: tokens.colors.text.muted }}>{"\u2014"}</Text>
            ) : (
              items.map((item, i) => (
                <Text key={i} style={{ fontSize: 11, color: tokens.colors.text.secondary, lineHeight: 15 }}>
                  {"\u2022"} {item}
                </Text>
              ))
            )}
          </View>
        );
      })}
    </View>
  );
}
