import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().nullable(),
  preferred_name: z.string().nullable(),
  role: z.enum(["student", "admin"]),
  onboarding_completed: z.boolean(),
  created_at: z.string().datetime(),
  last_active_at: z.string().datetime(),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const StudentProfileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  current_stage: z
    .enum(["high_school", "university", "recent_graduate", "career_changer"])
    .nullable(),
  academic_context: z.string().nullable(),
  country: z.string().nullable(),
  city_region: z.string().nullable(),
  current_school: z.string().nullable(),
  current_faculty: z.string().nullable(),
  intended_field: z.string().nullable(),
  relocation_willingness: z
    .enum(["no", "within_country", "international", "flexible"])
    .nullable(),
  decision_readiness: z
    .enum(["exploring", "narrowing", "validating", "ready_to_decide"])
    .nullable(),
  completion_percent: z.number().int().min(0).max(100),
  latest_version: z.number().int().min(1),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type StudentProfile = z.infer<typeof StudentProfileSchema>;

export const StudyDirectionSchema = z.object({
  id: z.string().uuid(),
  career_path_id: z.string().uuid(),
  faculty_cluster: z.string(),
  degree_type: z.enum(["bachelor", "master", "doctorate", "diploma", "certificate", "bootcamp"]),
  field_of_study: z.string(),
  country_notes: z.string().nullable(),
  prerequisites: z.string().nullable(),
  typical_duration_years: z.number().int().nullable(),
  relevance_level: z.enum(["primary", "secondary", "alternative"]),
  active: z.boolean(),
});
export type StudyDirection = z.infer<typeof StudyDirectionSchema>;

export const CountryStudyContextSchema = z.object({
  id: z.string().uuid(),
  country_code: z.string(),
  country_name: z.string(),
  education_system_notes: z.string().nullable(),
  typical_bachelor_years: z.number().int().nullable(),
  typical_master_years: z.number().int().nullable(),
  cost_level: z.enum(["low", "medium", "high", "very_high"]).nullable(),
  language_of_instruction: z.string().nullable(),
  visa_complexity: z.enum(["none", "easy", "moderate", "complex"]).nullable(),
  active: z.boolean(),
});
export type CountryStudyContext = z.infer<typeof CountryStudyContextSchema>;
