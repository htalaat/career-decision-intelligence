import type { EngineProfile, EngineCareerPath, Penalty } from "./types";
import { PENALTY_RISKY_DOMAINS, CONVENTIONAL_DOMAINS } from "../config/mappings";
import { PENALTIES } from "../config/scoring";

/**
 * Compute penalties for a career path based on constraint mismatches.
 * Penalties reduce the overall score but never remove a path entirely.
 */
export function computePenalties(
  profile: EngineProfile,
  career: EngineCareerPath,
): Penalty[] {
  const penalties: Penalty[] = [];

  // Duration penalty
  if (
    profile.constraints.max_study_years != null &&
    career.typical_duration_years != null &&
    career.typical_duration_years > profile.constraints.max_study_years
  ) {
    const overshoot = career.typical_duration_years - profile.constraints.max_study_years;
    penalties.push({
      type: "duration_mismatch",
      severity: Math.min(PENALTIES.duration.maxSeverity, overshoot * PENALTIES.duration.severityPerYear),
      reason: `Requires ${career.typical_duration_years} years of study, but you prefer max ${profile.constraints.max_study_years} years`,
    });
  }

  // Financial penalty
  if (
    profile.constraints.financial_level === "low" &&
    career.typical_duration_years != null &&
    career.typical_duration_years > PENALTIES.financial.durationThreshold
  ) {
    penalties.push({
      type: "financial_mismatch",
      severity: PENALTIES.financial.severity,
      reason: "Longer education path may be challenging with a tight budget",
    });
  }

  // Risk tolerance penalty
  if (profile.constraints.risk_tolerance === "low" && PENALTY_RISKY_DOMAINS.includes(career.domain)) {
    penalties.push({
      type: "risk_mismatch",
      severity: PENALTIES.risk.severity,
      reason: `${career.domain} careers tend to have higher uncertainty, and you prefer low risk`,
    });
  }

  // Family expectation — penalize unconventional paths when family pressure is high
  if (
    profile.constraints.family_expectation === "high" &&
    !CONVENTIONAL_DOMAINS.includes(career.domain)
  ) {
    penalties.push({
      type: "family_expectation",
      severity: PENALTIES.familyExpectation.severity,
      reason: "This path may not align with high family expectations for traditional careers",
    });
  }

  return penalties;
}

/** Sum of all penalty severities */
export function totalPenalty(penalties: Penalty[]): number {
  return penalties.reduce((sum, p) => sum + p.severity, 0);
}
