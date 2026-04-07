import type { EngineProfile, EngineCareerPath, ScoreBreakdown } from "./types";

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

  return {
    interestFit: clamp(interestFit),
    strengthFit: clamp(strengthFit),
    valuesFit: clamp(valuesFit),
    workstyleFit: clamp(workstyleFit),
    goalsFit: clamp(goalsFit),
    feasibilityFit: clamp(feasibilityFit),
    educationFit: clamp(educationFit),
    countryFit: clamp(countryFit),
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
  if (studentTraits.length === 0) return 50; // neutral if no data

  let totalScore = 0;
  let matchCount = 0;

  for (const trait of studentTraits) {
    const mapping = mappings.find((m) => m.trait_key === trait);
    if (mapping) {
      totalScore += mapping.weight * 100;
      matchCount++;
    }
  }

  if (matchCount === 0) return 30; // low score if no overlap at all

  // Base score from matches, with a bonus for having many matches
  const avgMatchScore = totalScore / matchCount;
  const coverageBonus = (matchCount / studentTraits.length) * 20;

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

  if (totalWeight === 0) return 50;

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
  let score = 70; // baseline feasibility

  // Duration check
  if (profile.constraints.max_study_years != null && career.typical_duration_years != null) {
    if (career.typical_duration_years <= profile.constraints.max_study_years) {
      score += 15;
    } else {
      const overshoot = career.typical_duration_years - profile.constraints.max_study_years;
      score -= overshoot * 10;
    }
  }

  // Financial check — expensive paths score lower for tight budgets
  if (profile.constraints.financial_level === "low" && career.typical_duration_years != null && career.typical_duration_years > 4) {
    score -= 15;
  }

  return score;
}

/**
 * Compute education path fit: does the student's current/intended field
 * align with the career's required study directions?
 */
function computeEducationFit(profile: EngineProfile, career: EngineCareerPath): number {
  if (career.studyDirections.length === 0) return 60; // no data = neutral

  const studentField = profile.intended_field ?? profile.current_faculty;
  if (!studentField || studentField === "undecided") return 55; // undecided = slight neutral

  // Check if any study direction matches the student's field
  const primaryMatch = career.studyDirections.some(
    (sd) => sd.field_of_study.toLowerCase().includes(studentField.replace(/_/g, " ")) ||
            studentField.includes(sd.faculty_cluster.replace(/_/g, " "))
  );

  if (primaryMatch) return 90;

  // Check secondary matches via faculty cluster
  const clusterMatch = career.studyDirections.some(
    (sd) => sd.faculty_cluster === profile.current_faculty
  );

  if (clusterMatch) return 70;

  return 40; // no match
}

/**
 * Compute country/location fit based on relocation willingness
 * and career domain availability.
 */
function computeCountryFit(profile: EngineProfile, career: EngineCareerPath): number {
  if (!profile.country) return 60; // no country = neutral

  let score = 70; // baseline

  // Check if career has country-specific study direction notes
  const hasCountryNotes = career.studyDirections.some((sd) => sd.country_notes);

  // Relocation affects feasibility
  if (profile.relocation_willingness === "no") {
    // Some careers are harder to pursue locally in certain regions
    const globalDomains = ["Technology", "Entrepreneurship"];
    if (globalDomains.includes(career.domain)) score += 10;
  } else if (profile.relocation_willingness === "international" || profile.relocation_willingness === "flexible") {
    score += 15; // more options available
  }

  if (hasCountryNotes) score += 5;

  return score;
}

// --- Helper mappers ---

function mapIncomePotential(potential: string | null): number {
  switch (potential) {
    case "very_high": return 95;
    case "high": return 75;
    case "medium": return 55;
    case "low": return 35;
    default: return 50;
  }
}

function mapStability(domain: string, tags: string[]): number {
  const stableDomains = ["Healthcare", "Finance", "Engineering", "Law/Policy"];
  const stableTags = ["stability", "organizational"];
  let score = 50;
  if (stableDomains.includes(domain)) score += 25;
  if (tags.some((t) => stableTags.includes(t))) score += 10;
  return Math.min(100, score);
}

function mapFlexibility(tags: string[]): number {
  const flexTags = ["remote", "flexible_hours", "autonomy", "entrepreneurial"];
  const matches = tags.filter((t) => flexTags.includes(t)).length;
  return 40 + matches * 15;
}

function mapPrestige(income: string | null, domain: string): number {
  let score = 50;
  if (income === "very_high") score += 20;
  if (income === "high") score += 10;
  const prestigeDomains = ["Law/Policy", "Finance", "Healthcare", "Technology"];
  if (prestigeDomains.includes(domain)) score += 15;
  return Math.min(100, score);
}

function mapCreativity(tags: string[], mappings: EngineCareerPath["traitMappings"]): number {
  const creativeTags = ["creative", "artistic", "innovative"];
  const tagScore = tags.filter((t) => creativeTags.includes(t)).length * 20;
  const mappingScore = mappings.find((m) => m.trait_key === "creative")?.weight ?? 0;
  return Math.min(100, 30 + tagScore + mappingScore * 40);
}

function mapImpact(tags: string[], mappings: EngineCareerPath["traitMappings"]): number {
  const impactTags = ["advocacy", "helping_others", "teaching", "social"];
  const tagScore = tags.filter((t) => impactTags.includes(t)).length * 20;
  const mappingScore = mappings.find((m) => m.trait_key === "helping_others")?.weight ?? 0;
  return Math.min(100, 30 + tagScore + mappingScore * 40);
}

function mapDurationFit(careerYears: number | null, maxYears: number | null): number {
  if (careerYears == null || maxYears == null) return 60;
  if (careerYears <= maxYears) return 90;
  const overshoot = careerYears - maxYears;
  return Math.max(20, 90 - overshoot * 20);
}

function mapRiskFit(domain: string, riskTolerance: string | null): number {
  const riskyDomains = ["Entrepreneurship", "Media/Comms", "Design"];
  const safeDomains = ["Healthcare", "Finance", "Engineering", "Law/Policy"];
  const isRisky = riskyDomains.includes(domain);
  const isSafe = safeDomains.includes(domain);

  switch (riskTolerance) {
    case "high": return isRisky ? 85 : isSafe ? 60 : 70;
    case "medium": return 70;
    case "low": return isSafe ? 85 : isRisky ? 40 : 60;
    default: return 60;
  }
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
