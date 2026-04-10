/**
 * Single source of truth for ALL user-facing text templates used by the
 * recommendation engine and action-plan generation.
 *
 * Engine and hook files import from here instead of using inline strings.
 * Changing a template here changes it everywhere.
 */

/** Current content template version tag */
export const CONTENT_VERSION = "v1" as const;

// ---------------------------------------------------------------------------
// Explanation templates — used by src/lib/engine/explain.ts
// ---------------------------------------------------------------------------

/** Templates for building career-fit explanation text. */
export const EXPLANATION_TEMPLATES = {
  // --- Positive signals ---

  /** Shown when the student's interests overlap with career trait mappings */
  matchesInterests: (traits: string) => `Matches your interests: ${traits}`,

  /** Shown when the student's strengths overlap with career trait mappings */
  leveragesStrengths: (traits: string) => `Leverages your strengths: ${traits}`,

  /** Shown when the student's values overlap with career trait mappings */
  alignsValues: (traits: string) => `Aligns with your values: ${traits}`,

  /** Shown when goals-fit score >= 70 */
  strongGoalAlignment: "Strong alignment with your priority goals",

  /** Shown when feasibility-fit score >= 80 */
  constraintsFavorable: "Practical constraints look favorable",

  /** Shown when education-fit score >= 80 */
  academicAligns: "Your academic direction aligns well with this path",

  /** Shown when country-fit score >= 80 */
  locationFit: "Good fit for your location and mobility preferences",

  // --- Cluster reaction signals ---

  /** Shown when a relevant cluster reaction is "feels_like_me" */
  clusterFeelsLikeMe: (clusterLabel: string) =>
    `You said '${clusterLabel}' feels like you — this career is at the heart of that direction`,

  /** Shown when a relevant cluster reaction is "not_for_me" */
  clusterNotForMe: (clusterLabel: string) =>
    `You said '${clusterLabel}' wasn't for you, but your profile suggests some fit — worth a second look?`,

  // --- Subject signals ---

  /** Shown when enjoyed subjects match the career domain */
  enjoyedSubjects: (subjects: string) =>
    `You enjoy ${subjects} — directly relevant to this path`,

  /** Shown when strong-at subjects match the career domain */
  strongInSubjects: (subjects: string) =>
    `You're strong in ${subjects} — a good foundation`,

  /** Shown when disliked subjects match the career domain (negative) */
  dislikedSubjectWarning: (subjects: string) =>
    `You said ${subjects} isn't for you — but this path involves it`,

  /** Shown as a blocker when disliked subjects match the career domain */
  dislikedSubjectBlocker: (subjects: string) =>
    `This career area connects to subjects you don't enjoy (${subjects})`,

  // --- Negatives ---

  /** Shown when no interests overlap */
  limitedInterestOverlap: "Limited overlap with your stated interests",

  /** Shown when goals-fit score < 40 */
  weakGoalAlignment: "Weaker alignment with your stated priorities",

  /** Shown when education-fit is low and student has a declared intended field */
  intendedFieldMismatch: (field: string) =>
    `Your intended field (${field}) differs from typical study paths for this career`,

  // --- What may block ---

  /** Shown when financial level is low and career study duration > 4 years */
  financiallyChallengingDuration: "Extended study duration may be financially challenging",

  /** Shown when career duration exceeds the student's max study years preference */
  exceedsMaxStudyYears: (years: number, maxYears: number) =>
    `This path typically requires ${years} years of study, exceeding your preference of ${maxYears} years`,

  /** Shown when student won't relocate but some study options require it */
  relocationRequired: "Some study options for this career may require relocating",

  // --- Study direction ---

  /** Primary study path description */
  primaryStudyPath: (career: string, field: string, degree: string) =>
    `To pursue ${career}, the primary study path is ${field} (${degree})`,

  /** Fallback education path description */
  typicalEducation: (path: string) => `Typical education: ${path}`,

  /** Fallback suggested education for whatToStudy */
  suggestedEducation: (path: string) => `Suggested education: ${path}`,

  // --- What-to-study parts ---

  /** Study direction line in whatToStudy block */
  studyDirectionLine: (field: string) => `Study direction: ${field}`,

  /** Faculty line in whatToStudy block */
  facultyLine: (faculty: string) => `Faculty: ${faculty}`,

  /** Degree line in whatToStudy block */
  degreeLine: (degree: string) => `Degree: ${degree}`,

  /** Duration line in whatToStudy block */
  durationLine: (years: number) => `Duration: ~${years} years`,

  /** Prerequisites line in whatToStudy block */
  prerequisitesLine: (prereqs: string) => `Prerequisites: ${prereqs}`,

  // --- Country considerations ---

  /** Shown when the student is open to international study/work */
  internationalOpenness:
    "Your openness to international study/work expands your options for this path",

  /** Shown when the student prefers to stay local */
  preferLocalDemand:
    "You prefer to stay local — verify that this career has strong local demand in your area",

  /** Fallback when no country data is available */
  noCountryConsiderations: "No country-specific considerations available",

  // --- Missing info ---

  /** Shown when fewer than 3 interests selected */
  moreInterestsNeeded: "More interest selections would improve accuracy",

  /** Shown when fewer than 3 strengths selected */
  moreStrengthsNeeded: "More strength selections would improve accuracy",

  /** Shown when financial constraints not provided */
  financialNotSpecified: "Financial constraints not specified",

  /** Shown when country not provided */
  countryNotSpecified: "Country not specified — location-aware guidance unavailable",

  /** Shown when intended field not selected or is undecided */
  noIntendedField: "No intended field of study selected — education fit is approximate",

  // --- Validation questions ---

  /** Prompt: talk to a professional */
  validationTalkTo: (career: string) =>
    `Have you talked to someone who works as a ${career}?`,

  /** Prompt: typical day awareness */
  validationTypicalDay: (domain: string) =>
    `Do you know what a typical day looks like in ${domain}?`,

  /** Prompt: prerequisite check */
  validationPrerequisites: (prerequisites: string) =>
    `Do you meet the prerequisites: ${prerequisites}?`,

  /** Prompt: education path readiness */
  validationEducationPath: (path: string) =>
    `Are you prepared for the education path: ${path}?`,

  /** Prompt: local opportunity research */
  validationCountryResearch: (career: string) =>
    `Have you researched ${career} opportunities in your country/region?`,

  // --- Default positive (fallback) ---

  /** Shown when no other positives were generated */
  defaultPositive: (domain: string) =>
    `${domain} is a recognized career domain with established paths`,
} as const;

// ---------------------------------------------------------------------------
// Faculty label map — used by formatFacultyLabel in explain.ts
// ---------------------------------------------------------------------------

/** Maps faculty cluster keys to human-readable display labels. */
export const FACULTY_LABEL_MAP: Readonly<Record<string, string>> = {
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

// ---------------------------------------------------------------------------
// Action plan templates — used by generateActionPlanTemplate in useDecisions.ts
// ---------------------------------------------------------------------------

/** Static task text for the 7-day milestone. */
export const ACTION_PLAN_TEMPLATES = {
  sevenDay: {
    /** Research daily life of a career */
    researchDay: (career: string) =>
      `Research what a typical day looks like for a ${career}`,

    /** Find professionals on LinkedIn */
    findProfessionals: (career: string) =>
      `Find 2-3 people working as a ${career} on LinkedIn and read their profiles`,

    /** Write down questions */
    writeQuestions: "Write down your top 3 questions about this career path",

    /** Investigate a validation question */
    investigateQuestion: (question: string) => `Investigate: ${question}`,
  },

  thirtyDay: {
    /** Talk to a professional */
    talkToProfessional: (career: string) =>
      `Talk to at least one ${career} about their experience and daily reality`,

    /** Research faculty programs */
    researchFacultyPrograms: (faculty: string) =>
      `Research ${faculty} programs at universities you're considering`,

    /** Look into degree requirements */
    lookIntoDegree: (degree: string) =>
      `Look into requirements for ${degree}`,

    /** Research education path */
    researchEducationPath: (path: string) =>
      `Research education path: ${path}`,

    /** Identify a skill to build */
    identifySkill: "Identify one skill you could start building now for this career",

    /** Compare against shortlist */
    comparePaths: "Compare this path against your other shortlisted options",

    /** Address a potential blocker */
    addressBlocker: (blocker: string) => `Address potential blocker: ${blocker}`,

    /** Research country considerations */
    researchCountry: (notes: string) =>
      `Research country considerations: ${notes}`,
  },

  ninetyDay: {
    /** Complete an intro course or project */
    completeCourse: "Complete an introductory course, project, or certification in this field",

    /** Attend an industry event */
    attendEvent: "Attend a relevant meetup, webinar, or industry event",

    /** Shadow or volunteer */
    shadowVolunteer: "Shadow or volunteer in a related role if possible",

    /** Update decision status */
    updateDecision: "Update your decision status — has your confidence changed?",

    /** Share plan for feedback */
    sharePlan: "Share your plan with a mentor, advisor, or trusted person for feedback",

    /** Prepare application materials */
    prepareApplication: (faculty: string) =>
      `Prepare application materials for ${faculty} programs if applicable`,
  },
} as const;
