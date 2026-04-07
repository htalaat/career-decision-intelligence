import type { EngineProfile, EngineCareerPath, ScoreBreakdown, Penalty, Explanation } from "./types";
import { DIRECTION_CLUSTERS } from "../utils/constants";

const SUBJECT_TO_DOMAINS: Record<string, string[]> = {
  physics: ["Engineering", "Technology"],
  chemistry: ["Healthcare", "Engineering"],
  biology: ["Healthcare"],
  environmental_science: ["Engineering"],
  computer_science: ["Technology"],
  math: ["Technology", "Finance", "Engineering"],
  further_math: ["Technology", "Finance", "Engineering"],
  statistics: ["Finance", "Technology"],
  english: ["Media/Comms", "Education", "Law/Policy"],
  arabic: ["Media/Comms", "Education"],
  french: ["Media/Comms", "Education"],
  spanish: ["Media/Comms", "Education"],
  german: ["Media/Comms", "Education"],
  other_language: ["Media/Comms", "Education"],
  history: ["Law/Policy", "Education"],
  geography: ["Engineering", "Education"],
  economics: ["Finance", "Business"],
  psychology: ["Healthcare", "Education"],
  sociology: ["Education", "Law/Policy"],
  political_science: ["Law/Policy"],
  philosophy: ["Law/Policy", "Education"],
  business_studies: ["Business", "Entrepreneurship"],
  accounting: ["Finance"],
  art: ["Design"],
  music: ["Media/Comms"],
  drama: ["Media/Comms"],
  design_tech: ["Design", "Engineering"],
  media_studies: ["Media/Comms", "Design"],
};

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

  // --- Cluster reaction signals ---
  if (profile.clusterReactions) {
    const domainToCluster: Record<string, string[]> = {
      "Technology": ["tech_solving", "science_research"],
      "Business": ["business_money", "startup_create"],
      "Finance": ["business_money"],
      "Design": ["design_create"],
      "Healthcare": ["health_care", "science_research"],
      "Law/Policy": ["law_justice"],
      "Media/Comms": ["media_stories"],
      "Engineering": ["engineering_build", "science_research"],
      "Education": ["science_research"],
      "Entrepreneurship": ["startup_create", "business_money"],
    };
    const relevantClusters = domainToCluster[career.domain] ?? [];
    for (const clusterKey of relevantClusters) {
      const reaction = profile.clusterReactions[clusterKey];
      if (!reaction) continue;
      const clusterDef = DIRECTION_CLUSTERS.find((c) => c.key === clusterKey);
      const clusterLabel = clusterDef?.label ?? clusterKey;
      if (reaction === "feels_like_me") {
        topPositives.push(`You said '${clusterLabel}' feels like you — this career is at the heart of that direction`);
      } else if (reaction === "not_for_me") {
        topNegatives.push(`You said '${clusterLabel}' wasn't for you, but your profile suggests some fit — worth a second look?`);
      }
    }
  }

  // --- Subject signals ---
  if (profile.subjectsEnjoyed.length > 0 || profile.subjectsGoodAt.length > 0) {
    const enjoyedMatch = profile.subjectsEnjoyed.filter((s) => {
      const domains = SUBJECT_TO_DOMAINS[s] ?? [];
      return domains.includes(career.domain);
    });
    const goodAtMatch = profile.subjectsGoodAt.filter((s) => {
      const domains = SUBJECT_TO_DOMAINS[s] ?? [];
      return domains.includes(career.domain);
    });
    const dislikedMatch = profile.subjectsDisliked.filter((s) => {
      const domains = SUBJECT_TO_DOMAINS[s] ?? [];
      return domains.includes(career.domain);
    });

    if (enjoyedMatch.length > 0) {
      topPositives.push(`You enjoy ${formatSubjectList(enjoyedMatch)} — directly relevant to this path`);
    }
    if (goodAtMatch.length > 0) {
      topPositives.push(`You're strong in ${formatSubjectList(goodAtMatch)} — a good foundation`);
    }
    if (dislikedMatch.length > 0) {
      topNegatives.push(`You said ${formatSubjectList(dislikedMatch)} isn't for you — but this path involves it`);
      whatMayBlock.push(`This career area connects to subjects you don't enjoy (${formatSubjectList(dislikedMatch)})`);
    }
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

function formatSubjectList(subjects: string[]): string {
  return subjects.map((s) => s.replace(/_/g, " ")).join(", ");
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
