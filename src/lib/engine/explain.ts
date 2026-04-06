import type { EngineProfile, EngineCareerPath, ScoreBreakdown, Penalty, Explanation } from "./types";

/**
 * Generate a human-readable explanation for why a career path scored the way it did.
 * Every explanation traces back to specific profile inputs.
 */
export function generateExplanation(
  profile: EngineProfile,
  career: EngineCareerPath,
  breakdown: ScoreBreakdown,
  penalties: Penalty[],
): Explanation {
  const topPositives: string[] = [];
  const topNegatives: string[] = [];
  const missingInfo: string[] = [];
  const validationQuestions: string[] = [];

  // Find which of the student's traits match the career
  const matchingInterests = profile.interests.filter((t) =>
    career.traitMappings.some((m) => m.trait_key === t && m.weight >= 0.5),
  );
  const matchingStrengths = profile.strengths.filter((t) =>
    career.traitMappings.some((m) => m.trait_key === t && m.weight >= 0.5),
  );
  const matchingValues = profile.values.filter((t) =>
    career.traitMappings.some((m) => m.trait_key === t && m.weight >= 0.5),
  );

  // Positives
  if (matchingInterests.length > 0) {
    topPositives.push(`Matches your interests: ${matchingInterests.join(", ")}`);
  }
  if (matchingStrengths.length > 0) {
    topPositives.push(`Leverages your strengths: ${matchingStrengths.join(", ")}`);
  }
  if (matchingValues.length > 0) {
    topPositives.push(`Aligns with your values: ${matchingValues.join(", ")}`);
  }
  if (breakdown.goalsFit >= 70) {
    topPositives.push("Strong alignment with your priority goals");
  }
  if (breakdown.feasibilityFit >= 80) {
    topPositives.push("Practical constraints look favorable");
  }

  // Negatives
  for (const penalty of penalties) {
    topNegatives.push(penalty.reason);
  }
  if (matchingInterests.length === 0) {
    topNegatives.push("Limited overlap with your stated interests");
  }
  if (breakdown.goalsFit < 40) {
    topNegatives.push("Weaker alignment with your stated priorities");
  }

  // Missing info
  if (profile.interests.length < 3) missingInfo.push("More interest selections would improve accuracy");
  if (profile.strengths.length < 3) missingInfo.push("More strength selections would improve accuracy");
  if (!profile.constraints.financial_level) missingInfo.push("Financial constraints not specified");

  // Validation questions
  validationQuestions.push(`Have you talked to someone who works as a ${career.title}?`);
  validationQuestions.push(`Do you know what a typical day looks like in ${career.domain}?`);
  if (career.education_path) {
    validationQuestions.push(`Are you prepared for the education path: ${career.education_path}?`);
  }

  // Ensure we have at least one positive even for low-scoring paths
  if (topPositives.length === 0) {
    topPositives.push(`${career.domain} is a recognized career domain with established paths`);
  }

  return { topPositives, topNegatives, missingInfo, validationQuestions };
}
