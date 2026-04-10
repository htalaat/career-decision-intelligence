import type { EngineProfile, EngineCareerPath, ScoreBreakdown } from "./types";
import {
  SUBJECT_TO_DOMAINS,
  DOMAIN_TO_CLUSTERS,
  GLOBAL_DOMAINS,
  STABLE_DOMAINS,
  STABLE_TAGS,
  FLEX_TAGS,
  PRESTIGE_DOMAINS,
  CREATIVE_TAGS,
  IMPACT_TAGS,
  RISKY_DOMAINS,
  SAFE_DOMAINS,
} from "../config/mappings";
import {
  TRAIT_OVERLAP,
  GOALS_FIT,
  FEASIBILITY,
  EDUCATION_FIT,
  COUNTRY_FIT,
  CLUSTER_REACTION_FIT,
  INCOME_POTENTIAL_MAP,
  STABILITY,
  FLEXIBILITY,
  PRESTIGE,
  CREATIVITY,
  IMPACT,
  DURATION_FIT,
  RISK_FIT,
  SUBJECT_FIT,
} from "../config/scoring";

/**
 * Compute fit scores between a student profile and a career path.
 * Each dimension is 0-100. Scoring is based on overlap between
 * the student's selected traits and the career's trait mappings.
 */
export function computeScore(
  profile: EngineProfile,
  career: EngineCareerPath,
): ScoreBreakdown {
  const mappings = career.traitMappings;

  const interestFit = computeTraitOverlap(profile.interests, mappings, "interest");
  const strengthFit = computeTraitOverlap(profile.strengths, mappings, "strength");
  const valuesFit = computeTraitOverlap(profile.values, mappings, "value");
  const workstyleFit = computeTraitOverlap(profile.workstyle, mappings, "workstyle");
  const goalsFit = computeGoalsFit(profile, career);
  const feasibilityFit = computeFeasibility(profile, career);

  const educationFit = computeEducationFit(profile, career);
  const countryFit = computeCountryFit(profile, career);
  const clusterReactionFit = computeClusterReactionFit(profile, career);
  const subjectFit = computeSubjectFit(profile, career);

  return {
    interestFit: clamp(interestFit),
    strengthFit: clamp(strengthFit),
    valuesFit: clamp(valuesFit),
    workstyleFit: clamp(workstyleFit),
    goalsFit: clamp(goalsFit),
    feasibilityFit: clamp(feasibilityFit),
    educationFit: clamp(educationFit),
    countryFit: clamp(countryFit),
    clusterReactionFit: clamp(clusterReactionFit),
    subjectFit: clamp(subjectFit),
  };
}

/**
 * Compute overlap between student's selected traits and career's trait mappings.
 * For each trait the student selected, if the career has a mapping for it,
 * add the mapping weight * 100. Then normalize by the number of student traits.
 */
function computeTraitOverlap(
  studentTraits: string[],
  mappings: EngineCareerPath["traitMappings"],
  _category: string,
): number {
  if (studentTraits.length === 0) return TRAIT_OVERLAP.neutralScore; // neutral if no data

  let totalScore = 0;
  let matchCount = 0;

  for (const trait of studentTraits) {
    const mapping = mappings.find((m) => m.trait_key === trait);
    if (mapping) {
      totalScore += mapping.weight * 100;
      matchCount++;
    }
  }

  if (matchCount === 0) return TRAIT_OVERLAP.noOverlapScore; // low score if no overlap at all

  // Base score from matches, with a bonus for having many matches
  const avgMatchScore = totalScore / matchCount;
  const coverageBonus = (matchCount / studentTraits.length) * TRAIT_OVERLAP.coverageBonusMax;

  return avgMatchScore + coverageBonus;
}

/**
 * Compute how well the career aligns with the student's goal weights.
 * Maps career metadata to weight dimensions.
 */
function computeGoalsFit(profile: EngineProfile, career: EngineCareerPath): number {
  const w = profile.weights;
  const totalWeight = w.income + w.stability + w.flexibility + w.prestige +
    w.creativity + w.impact + w.study_duration + w.risk;

  if (totalWeight === 0) return GOALS_FIT.defaultScore;

  // Map career properties to how well they satisfy each goal
  const incomeScore = mapIncomePotential(career.income_potential);
  const stabilityScore = mapStability(career.domain, career.tags);
  const flexibilityScore = mapFlexibility(career.tags);
  const prestigeScore = mapPrestige(career.income_potential, career.domain);
  const creativityScore = mapCreativity(career.tags, career.traitMappings);
  const impactScore = mapImpact(career.tags, career.traitMappings);
  const durationScore = mapDurationFit(career.typical_duration_years, profile.constraints.max_study_years);
  const riskScore = mapRiskFit(career.domain, profile.constraints.risk_tolerance);

  // Weighted average based on student's priorities
  const weighted =
    (w.income * incomeScore +
      w.stability * stabilityScore +
      w.flexibility * flexibilityScore +
      w.prestige * prestigeScore +
      w.creativity * creativityScore +
      w.impact * impactScore +
      w.study_duration * durationScore +
      w.risk * riskScore) / totalWeight;

  return weighted;
}

/**
 * Compute practical feasibility based on constraints.
 */
function computeFeasibility(profile: EngineProfile, career: EngineCareerPath): number {
  let score = FEASIBILITY.baseline; // baseline feasibility

  // Duration check
  if (profile.constraints.max_study_years != null && career.typical_duration_years != null) {
    if (career.typical_duration_years <= profile.constraints.max_study_years) {
      score += FEASIBILITY.durationMatchBonus;
    } else {
      const overshoot = career.typical_duration_years - profile.constraints.max_study_years;
      score -= overshoot * FEASIBILITY.durationOvershootPenaltyPerYear;
    }
  }

  // Financial check — expensive paths score lower for tight budgets
  if (profile.constraints.financial_level === "low" && career.typical_duration_years != null && career.typical_duration_years > FEASIBILITY.lowBudgetDurationThreshold) {
    score -= FEASIBILITY.lowBudgetLongDurationPenalty;
  }

  return score;
}

/**
 * Compute education path fit: does the student's current/intended field
 * align with the career's required study directions?
 */
function computeEducationFit(profile: EngineProfile, career: EngineCareerPath): number {
  if (career.studyDirections.length === 0) return EDUCATION_FIT.noDataScore; // no data = neutral

  const studentField = profile.intended_field ?? profile.current_faculty;
  if (!studentField || studentField === "undecided") return EDUCATION_FIT.undecidedScore; // undecided = slight neutral

  // Check if any study direction matches the student's field
  const primaryMatch = career.studyDirections.some(
    (sd) => sd.field_of_study.toLowerCase().includes(studentField.replace(/_/g, " ")) ||
            studentField.includes(sd.faculty_cluster.replace(/_/g, " "))
  );

  if (primaryMatch) return EDUCATION_FIT.primaryMatchScore;

  // Check secondary matches via faculty cluster
  const clusterMatch = career.studyDirections.some(
    (sd) => sd.faculty_cluster === profile.current_faculty
  );

  if (clusterMatch) return EDUCATION_FIT.clusterMatchScore;

  return EDUCATION_FIT.noMatchScore; // no match
}

/**
 * Compute country/location fit based on relocation willingness
 * and career domain availability.
 */
function computeCountryFit(profile: EngineProfile, career: EngineCareerPath): number {
  if (!profile.country) return COUNTRY_FIT.noCountryScore; // no country = neutral

  let score = COUNTRY_FIT.baseline; // baseline

  // Check if career has country-specific study direction notes
  const hasCountryNotes = career.studyDirections.some((sd) => sd.country_notes);

  // Relocation affects feasibility
  if (profile.relocation_willingness === "no") {
    // Some careers are harder to pursue locally in certain regions
    if (GLOBAL_DOMAINS.includes(career.domain)) score += COUNTRY_FIT.globalDomainBonus;
  } else if (profile.relocation_willingness === "international" || profile.relocation_willingness === "flexible") {
    score += COUNTRY_FIT.internationalBonus; // more options available
  }

  if (hasCountryNotes) score += COUNTRY_FIT.countryNotesBonus;

  return score;
}

/**
 * Compute how the student's cluster reactions affect this career's score.
 * Cluster reactions are first-person signals that trait overlap can't capture.
 */
function computeClusterReactionFit(profile: EngineProfile, career: EngineCareerPath): number {
  if (!profile.clusterReactions) return CLUSTER_REACTION_FIT.noReactionsScore; // no reactions = neutral

  const relevantClusters = DOMAIN_TO_CLUSTERS[career.domain] ?? [];
  let bestScore: number = CLUSTER_REACTION_FIT.defaultBestScore;

  for (const clusterKey of relevantClusters) {
    const reaction = profile.clusterReactions[clusterKey];
    if (!reaction) continue;

    let score: number = CLUSTER_REACTION_FIT.defaultBestScore;
    switch (reaction) {
      case "feels_like_me": score = CLUSTER_REACTION_FIT.reactionScores.feels_like_me; break;
      case "explore": score = CLUSTER_REACTION_FIT.reactionScores.explore; break;
      case "surprised": score = CLUSTER_REACTION_FIT.reactionScores.surprised; break;
      case "not_for_me": score = CLUSTER_REACTION_FIT.reactionScores.not_for_me; break;
      case "not_sure": score = CLUSTER_REACTION_FIT.reactionScores.not_sure; break;
    }

    if (score > bestScore) {
      bestScore = score;
    }
  }

  return bestScore;
}

// --- Helper mappers ---

function mapIncomePotential(potential: string | null): number {
  switch (potential) {
    case "very_high": return INCOME_POTENTIAL_MAP.very_high;
    case "high": return INCOME_POTENTIAL_MAP.high;
    case "medium": return INCOME_POTENTIAL_MAP.medium;
    case "low": return INCOME_POTENTIAL_MAP.low;
    default: return INCOME_POTENTIAL_MAP.default;
  }
}

function mapStability(domain: string, tags: string[]): number {
  let score = STABILITY.base;
  if (STABLE_DOMAINS.includes(domain)) score += STABILITY.domainBonus;
  if (tags.some((t) => STABLE_TAGS.includes(t))) score += STABILITY.tagBonus;
  return Math.min(100, score);
}

function mapFlexibility(tags: string[]): number {
  const matches = tags.filter((t) => FLEX_TAGS.includes(t)).length;
  return FLEXIBILITY.base + matches * FLEXIBILITY.perMatchBonus;
}

function mapPrestige(income: string | null, domain: string): number {
  let score = PRESTIGE.base;
  if (income === "very_high") score += PRESTIGE.veryHighIncomeBonus;
  if (income === "high") score += PRESTIGE.highIncomeBonus;
  if (PRESTIGE_DOMAINS.includes(domain)) score += PRESTIGE.domainBonus;
  return Math.min(100, score);
}

function mapCreativity(tags: string[], mappings: EngineCareerPath["traitMappings"]): number {
  const tagScore = tags.filter((t) => CREATIVE_TAGS.includes(t)).length * CREATIVITY.perTagScore;
  const mappingScore = mappings.find((m) => m.trait_key === "creative")?.weight ?? 0;
  return Math.min(100, CREATIVITY.base + tagScore + mappingScore * CREATIVITY.mappingMultiplier);
}

function mapImpact(tags: string[], mappings: EngineCareerPath["traitMappings"]): number {
  const tagScore = tags.filter((t) => IMPACT_TAGS.includes(t)).length * IMPACT.perTagScore;
  const mappingScore = mappings.find((m) => m.trait_key === "helping_others")?.weight ?? 0;
  return Math.min(100, IMPACT.base + tagScore + mappingScore * IMPACT.mappingMultiplier);
}

function mapDurationFit(careerYears: number | null, maxYears: number | null): number {
  if (careerYears == null || maxYears == null) return DURATION_FIT.noDataScore;
  if (careerYears <= maxYears) return DURATION_FIT.fitsScore;
  const overshoot = careerYears - maxYears;
  return Math.max(DURATION_FIT.minScore, DURATION_FIT.fitsScore - overshoot * DURATION_FIT.perYearOvershootPenalty);
}

function mapRiskFit(domain: string, riskTolerance: string | null): number {
  const isRisky = RISKY_DOMAINS.includes(domain);
  const isSafe = SAFE_DOMAINS.includes(domain);

  switch (riskTolerance) {
    case "high": return isRisky ? RISK_FIT.high_risky : isSafe ? RISK_FIT.high_safe : RISK_FIT.high_other;
    case "medium": return RISK_FIT.medium;
    case "low": return isSafe ? RISK_FIT.low_safe : isRisky ? RISK_FIT.low_risky : RISK_FIT.low_other;
    default: return RISK_FIT.default;
  }
}

/**
 * Compute how well the student's subject choices align with the career's domain.
 * Uses SUBJECT_TO_DOMAINS to map each subject to relevant career domains.
 */
function computeSubjectFit(profile: EngineProfile, career: EngineCareerPath): number {
  const enjoyed = profile.subjectsEnjoyed ?? [];
  const goodAt = profile.subjectsGoodAt ?? [];
  const disliked = profile.subjectsDisliked ?? [];

  if (enjoyed.length === 0 && goodAt.length === 0 && disliked.length === 0) return SUBJECT_FIT.noSubjectsScore;

  let score = SUBJECT_FIT.baseScore;
  let signals = 0;

  // Check if any enjoyed subjects map to this career's domain
  for (const subject of enjoyed) {
    const domains = SUBJECT_TO_DOMAINS[subject] ?? [];
    if (domains.includes(career.domain)) {
      score += SUBJECT_FIT.enjoyedMatchBonus;
      signals++;
    }
  }

  // Check if any good-at subjects map to this career's domain
  for (const subject of goodAt) {
    const domains = SUBJECT_TO_DOMAINS[subject] ?? [];
    if (domains.includes(career.domain)) {
      score += SUBJECT_FIT.goodAtMatchBonus;
      signals++;
    }
  }

  // Check if any disliked subjects map to this career's domain
  for (const subject of disliked) {
    const domains = SUBJECT_TO_DOMAINS[subject] ?? [];
    if (domains.includes(career.domain)) {
      score -= SUBJECT_FIT.dislikedMatchPenalty;
      signals++;
    }
  }

  // Bonus for having subject data at all
  if (signals > 0) score += SUBJECT_FIT.anySignalsBonus;

  return score;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
