import type { EngineProfile, EngineCareerPath, ScoreBreakdown, Penalty, Explanation } from "./types";
import { DIRECTION_CLUSTERS } from "../utils/constants";
import { SUBJECT_TO_DOMAINS, DOMAIN_TO_CLUSTERS } from "../config/mappings";
import { EXPLANATION_TEMPLATES, FACULTY_LABEL_MAP } from "../config/content";

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
    topPositives.push(EXPLANATION_TEMPLATES.matchesInterests(matchingInterests.map(formatTraitLabel).join(", ")));
  }
  if (matchingStrengths.length > 0) {
    topPositives.push(EXPLANATION_TEMPLATES.leveragesStrengths(matchingStrengths.map(formatTraitLabel).join(", ")));
  }
  if (matchingValues.length > 0) {
    topPositives.push(EXPLANATION_TEMPLATES.alignsValues(matchingValues.map(formatTraitLabel).join(", ")));
  }
  if (breakdown.goalsFit >= 70) {
    topPositives.push(EXPLANATION_TEMPLATES.strongGoalAlignment);
  }
  if (breakdown.feasibilityFit >= 80) {
    topPositives.push(EXPLANATION_TEMPLATES.constraintsFavorable);
  }
  if (breakdown.educationFit >= 80) {
    topPositives.push(EXPLANATION_TEMPLATES.academicAligns);
  }
  if (breakdown.countryFit >= 80) {
    topPositives.push(EXPLANATION_TEMPLATES.locationFit);
  }

  // --- Cluster reaction signals ---
  if (profile.clusterReactions) {
    const relevantClusters = DOMAIN_TO_CLUSTERS[career.domain] ?? [];
    for (const clusterKey of relevantClusters) {
      const reaction = profile.clusterReactions[clusterKey];
      if (!reaction) continue;
      const clusterDef = DIRECTION_CLUSTERS.find((c) => c.key === clusterKey);
      const clusterLabel = clusterDef?.label ?? clusterKey;
      if (reaction === "feels_like_me") {
        topPositives.push(EXPLANATION_TEMPLATES.clusterFeelsLikeMe(clusterLabel));
      } else if (reaction === "not_for_me") {
        topNegatives.push(EXPLANATION_TEMPLATES.clusterNotForMe(clusterLabel));
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
      topPositives.push(EXPLANATION_TEMPLATES.enjoyedSubjects(formatSubjectList(enjoyedMatch)));
    }
    if (goodAtMatch.length > 0) {
      topPositives.push(EXPLANATION_TEMPLATES.strongInSubjects(formatSubjectList(goodAtMatch)));
    }
    if (dislikedMatch.length > 0) {
      topNegatives.push(EXPLANATION_TEMPLATES.dislikedSubjectWarning(formatSubjectList(dislikedMatch)));
      whatMayBlock.push(EXPLANATION_TEMPLATES.dislikedSubjectBlocker(formatSubjectList(dislikedMatch)));
    }
  }

  // --- Negatives ---
  for (const penalty of penalties) {
    topNegatives.push(penalty.reason);
  }
  if (matchingInterests.length === 0) {
    topNegatives.push(EXPLANATION_TEMPLATES.limitedInterestOverlap);
  }
  if (breakdown.goalsFit < 40) {
    topNegatives.push(EXPLANATION_TEMPLATES.weakGoalAlignment);
  }
  if (breakdown.educationFit < 50 && profile.intended_field && profile.intended_field !== "undecided") {
    topNegatives.push(EXPLANATION_TEMPLATES.intendedFieldMismatch(formatTraitLabel(profile.intended_field)));
  }

  // --- What may block this path ---
  if (profile.constraints.financial_level === "low" && career.typical_duration_years && career.typical_duration_years > 4) {
    whatMayBlock.push(EXPLANATION_TEMPLATES.financiallyChallengingDuration);
  }
  if (profile.constraints.max_study_years && career.typical_duration_years && career.typical_duration_years > profile.constraints.max_study_years) {
    whatMayBlock.push(EXPLANATION_TEMPLATES.exceedsMaxStudyYears(career.typical_duration_years, profile.constraints.max_study_years));
  }
  if (profile.relocation_willingness === "no" && career.studyDirections.some((sd) => sd.country_notes?.includes("international"))) {
    whatMayBlock.push(EXPLANATION_TEMPLATES.relocationRequired);
  }
  for (const penalty of penalties) {
    if (penalty.severity >= 10) {
      whatMayBlock.push(penalty.reason);
    }
  }

  // --- Study direction ---
  const primaryDirection = career.studyDirections.find((sd) => sd.relevance_level === "primary");
  const studyDirection = primaryDirection
    ? EXPLANATION_TEMPLATES.primaryStudyPath(career.title, primaryDirection.field_of_study, primaryDirection.degree_type)
    : career.education_path
      ? EXPLANATION_TEMPLATES.typicalEducation(career.education_path)
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
      ? EXPLANATION_TEMPLATES.suggestedEducation(career.education_path)
      : null;

  // --- Country considerations ---
  const countryDirection = career.studyDirections.find((sd) => sd.country_notes);
  const countryConsiderations = profile.country
    ? buildCountryConsiderations(profile, career, countryDirection)
    : null;

  // --- Missing info ---
  if (profile.interests.length < 3) missingInfo.push(EXPLANATION_TEMPLATES.moreInterestsNeeded);
  if (profile.strengths.length < 3) missingInfo.push(EXPLANATION_TEMPLATES.moreStrengthsNeeded);
  if (!profile.constraints.financial_level) missingInfo.push(EXPLANATION_TEMPLATES.financialNotSpecified);
  if (!profile.country) missingInfo.push(EXPLANATION_TEMPLATES.countryNotSpecified);
  if (!profile.intended_field || profile.intended_field === "undecided") {
    missingInfo.push(EXPLANATION_TEMPLATES.noIntendedField);
  }

  // --- Validation questions ---
  validationQuestions.push(EXPLANATION_TEMPLATES.validationTalkTo(career.title));
  validationQuestions.push(EXPLANATION_TEMPLATES.validationTypicalDay(career.domain));
  if (primaryDirection?.prerequisites) {
    validationQuestions.push(EXPLANATION_TEMPLATES.validationPrerequisites(primaryDirection.prerequisites));
  }
  if (career.education_path) {
    validationQuestions.push(EXPLANATION_TEMPLATES.validationEducationPath(career.education_path));
  }
  if (profile.country) {
    validationQuestions.push(EXPLANATION_TEMPLATES.validationCountryResearch(career.title));
  }

  // Ensure at least one positive
  if (topPositives.length === 0) {
    topPositives.push(EXPLANATION_TEMPLATES.defaultPositive(career.domain));
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
  return FACULTY_LABEL_MAP[cluster] ?? cluster.replace(/_/g, " ");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildWhatToStudy(
  career: EngineCareerPath,
  direction: EngineCareerPath["studyDirections"][0],
): string {
  const parts: string[] = [];
  parts.push(EXPLANATION_TEMPLATES.studyDirectionLine(direction.field_of_study));
  parts.push(EXPLANATION_TEMPLATES.facultyLine(formatFacultyLabel(direction.faculty_cluster)));
  parts.push(EXPLANATION_TEMPLATES.degreeLine(capitalize(direction.degree_type)));
  if (direction.typical_duration_years) {
    parts.push(EXPLANATION_TEMPLATES.durationLine(direction.typical_duration_years));
  }
  if (direction.prerequisites) {
    parts.push(EXPLANATION_TEMPLATES.prerequisitesLine(direction.prerequisites));
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
    parts.push(EXPLANATION_TEMPLATES.internationalOpenness);
  } else if (profile.relocation_willingness === "no") {
    parts.push(EXPLANATION_TEMPLATES.preferLocalDemand);
  }

  return parts.length > 0 ? parts.join(". ") : EXPLANATION_TEMPLATES.noCountryConsiderations;
}
