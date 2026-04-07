/** Input to the scoring engine — everything about the student */
export interface EngineProfile {
  interests: string[];
  strengths: string[];
  values: string[];
  workstyle: string[];
  weights: {
    income: number;
    stability: number;
    flexibility: number;
    prestige: number;
    creativity: number;
    impact: number;
    study_duration: number;
    risk: number;
  };
  constraints: {
    financial_level: string | null;
    family_expectation: string | null;
    risk_tolerance: string | null;
    max_study_years: number | null;
    location_constraint: string | null;
  };
  current_stage: string | null;
  country: string | null;
  city_region: string | null;
  current_faculty: string | null;
  intended_field: string | null;
  relocation_willingness: string | null;
  decision_readiness: string | null;
  study_country_preference: string | null;
  clusterReactions: Record<string, string> | null;
}

/** A career path with its trait mappings and study directions attached */
export interface EngineCareerPath {
  id: string;
  slug: string;
  title: string;
  domain: string;
  summary: string;
  education_path: string | null;
  typical_duration_years: number | null;
  income_potential: string | null;
  tags: string[];
  traitMappings: Array<{
    trait_key: string;
    weight: number;
    rationale: string | null;
  }>;
  studyDirections: Array<{
    faculty_cluster: string;
    degree_type: string;
    field_of_study: string;
    country_notes: string | null;
    prerequisites: string | null;
    typical_duration_years: number | null;
    relevance_level: string;
  }>;
}

/** Score breakdown for one career path */
export interface ScoreBreakdown {
  interestFit: number;
  strengthFit: number;
  valuesFit: number;
  workstyleFit: number;
  goalsFit: number;
  feasibilityFit: number;
  educationFit: number;
  countryFit: number;
  clusterReactionFit: number;
}

/** Penalty applied to a career path */
export interface Penalty {
  type: string;
  severity: number;
  reason: string;
}

/** Explanation for why a path scored the way it did */
export interface Explanation {
  topPositives: string[];
  topNegatives: string[];
  missingInfo: string[];
  validationQuestions: string[];
  studyDirection: string | null;
  suggestedFaculty: string | null;
  suggestedDegree: string | null;
  countryConsiderations: string | null;
  whatToStudy: string | null;
  whatMayBlock: string[];
}

/** Complete scored result for one career path */
export interface ScoredPath {
  careerPathId: string;
  slug: string;
  title: string;
  domain: string;
  summary: string;
  overallScore: number;
  confidenceScore: number;
  breakdown: ScoreBreakdown;
  penalties: Penalty[];
  explanation: Explanation;
  rank: number;
}

/** Output of a full recommendation run */
export interface RecommendationResult {
  scoredPaths: ScoredPath[];
  scoringModelVersion: string;
  profileSnapshot: EngineProfile;
}
