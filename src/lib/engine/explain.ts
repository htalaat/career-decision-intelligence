import type { EngineProfile, EngineCareerPath, ScoreBreakdown, Penalty, Explanation } from "./types";

/**
 * Generate a human-readable explanation for why a career path scored the way it did.
 * Every explanation traces back to specific profile inputs.
 * Now includes study direction, faculty suggestions, and country considerations.
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
  const whatMayBlock: string[] = [];

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

  // --- Positives ---
  if (matchingInterests.length > 0) {
    topPositives.push(`Matches your interests: ${matchingInterests.map(formatTraitLabel).join(", ")}`);
  }
  if (matchingStrengths.length > 0) {
    topPositives.push(`Leverages your strengths: ${matchingStrengths.map(formatTraitLabel).join(", ")}`);
  }
  if (matchingValues.length > 0) {
    topPositives.push(`Aligns with your values: ${matchingValues.map(formatTraitLabel).join(", ")}`);
  }
  if (breakdown.goalsFit >= 70) {
    topPositives.push("Strong alignment with your priority goals");
  }
  if (breakdown.feasibilityFit >= 80) {
    topPositives.push("Practical constraints look favorable");
  }
  if (breakdown.educationFit >= 80) {
    topPositives.push("Your academic direction aligns well with this path");
  }
  if (breakdown.countryFit >= 80) {
    topPositives.push("Good fit for your location and mobility preferences");
  }

  // --- Negatives ---
  for (const penalty of penalties) {
    topNegatives.push(penalty.reason);
  }
  if (matchingInterests.length === 0) {
    topNegatives.push("Limited overlap with your stated interests");
  }
  if (breakdown.goalsFit < 40) {
    topNegatives.push("Weaker alignment with your stated priorities");
  }
  if (breakdown.educationFit < 50 && profile.intended_field && profile.intended_field !== "undecided") {
    topNegatives.push(`Your intended field (${formatTraitLabel(profile.intended_field)}) differs from typical study paths for this career`);
  }

  // --- What may block this path ---
  if (profile.constraints.financial_level === "low" && career.typical_duration_years && career.typical_duration_years > 4) {
    whatMayBlock.push("Extended study duration may be financially challenging");
  }
  if (profile.constraints.max_study_years && career.typical_duration_years && career.typical_duration_years > profile.constraints.max_study_years) {
    whatMayBlock.push(`This path typically requires ${career.typical_duration_years} years of study, exceeding your preference of ${profile.constraints.max_study_years} years`);
  }
  if (profile.relocation_willingness === "no" && career.studyDirections.some((sd) => sd.country_notes?.includes("international"))) {
    whatMayBlock.push("Some study options for this career may require relocating");
  }
  for (const penalty of penalties) {
    if (penalty.severity >= 10) {
      whatMayBlock.push(penalty.reason);
    }
  }

  // --- Study direction ---
  const primaryDirection = career.studyDirections.find((sd) => sd.relevance_level === "primary");
  const studyDirection = primaryDirection
    ? `To pursue ${career.title}, the primary study path is ${primaryDirection.field_of_study} (${primaryDirection.degree_type})`
    : career.education_path
      ? `Typical education: ${career.education_path}`
      : null;

  const suggestedFaculty = primaryDirection?.faculty_cluster
    ? formatFacultyLabel(primaryDirection.faculty_cluster)
    : null;

  const suggestedDegree = primaryDirection
    ? `${capitalize(primaryDirection.degree_type)} in ${primaryDirection.field_of_study}`
    : null;

  const whatToStudy = primaryDirection
    ? buildWhatToStudy(career, primaryDirection)
    : career.education_path
      ? `Suggested education: ${career.education_path}`
      : null;

  // --- Country considerations ---
  const countryDirection = career.studyDirections.find((sd) => sd.country_notes);
  const countryConsiderations = profile.country
    ? buildCountryConsiderations(profile, career, countryDirection)
    : null;

  // --- Missing info ---
  if (profile.interests.length < 3) missingInfo.push("More interest selections would improve accuracy");
  if (profile.strengths.length < 3) missingInfo.push("More strength selections would improve accuracy");
  if (!profile.constraints.financial_level) missingInfo.push("Financial constraints not specified");
  if (!profile.country) missingInfo.push("Country not specified — location-aware guidance unavailable");
  if (!profile.intended_field || profile.intended_field === "undecided") {
    missingInfo.push("No intended field of study selected — education fit is approximate");
  }

  // --- Validation questions ---
  validationQuestions.push(`Have you talked to someone who works as a ${career.title}?`);
  validationQuestions.push(`Do you know what a typical day looks like in ${career.domain}?`);
  if (primaryDirection?.prerequisites) {
    validationQuestions.push(`Do you meet the prerequisites: ${primaryDirection.prerequisites}?`);
  }
  if (career.education_path) {
    validationQuestions.push(`Are you prepared for the education path: ${career.education_path}?`);
  }
  if (profile.country) {
    validationQuestions.push(`Have you researched ${career.title} opportunities in your country/region?`);
  }

  // Ensure at least one positive
  if (topPositives.length === 0) {
    topPositives.push(`${career.domain} is a recognized career domain with established paths`);
  }

  return {
    topPositives,
    topNegatives,
    missingInfo,
    validationQuestions,
    studyDirection,
    suggestedFaculty,
    suggestedDegree,
    countryConsiderations,
    whatToStudy,
    whatMayBlock,
  };
}

// --- Helpers ---

function formatTraitLabel(key: string): string {
  return key.replace(/_/g, " ");
}

function formatFacultyLabel(cluster: string): string {
  const map: Record<string, string> = {
    engineering_technology: "Engineering & Technology",
    computer_science_it: "Computer Science & IT",
    business_management: "Business & Management",
    finance_economics: "Finance & Economics",
    medicine_health: "Medicine & Health Sciences",
    law_political_science: "Law & Political Science",
    natural_sciences: "Natural Sciences",
    social_sciences: "Social Sciences",
    arts_design: "Arts, Design & Architecture",
    media_communications: "Media & Communications",
    education: "Education",
    humanities_languages: "Humanities & Languages",
    environmental_agriculture: "Environmental Science",
  };
  return map[cluster] ?? cluster.replace(/_/g, " ");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildWhatToStudy(
  career: EngineCareerPath,
  direction: EngineCareerPath["studyDirections"][0],
): string {
  const parts: string[] = [];
  parts.push(`Study direction: ${direction.field_of_study}`);
  parts.push(`Faculty: ${formatFacultyLabel(direction.faculty_cluster)}`);
  parts.push(`Degree: ${capitalize(direction.degree_type)}`);
  if (direction.typical_duration_years) {
    parts.push(`Duration: ~${direction.typical_duration_years} years`);
  }
  if (direction.prerequisites) {
    parts.push(`Prerequisites: ${direction.prerequisites}`);
  }
  return parts.join(". ");
}

function buildCountryConsiderations(
  profile: EngineProfile,
  career: EngineCareerPath,
  countryDirection: EngineCareerPath["studyDirections"][0] | undefined,
): string {
  const parts: string[] = [];

  if (countryDirection?.country_notes) {
    parts.push(countryDirection.country_notes);
  }

  if (profile.relocation_willingness === "international" || profile.relocation_willingness === "flexible") {
    parts.push("Your openness to international study/work expands your options for this path");
  } else if (profile.relocation_willingness === "no") {
    parts.push("You prefer to stay local — verify that this career has strong local demand in your area");
  }

  return parts.length > 0 ? parts.join(". ") : "No country-specific considerations available";
}
