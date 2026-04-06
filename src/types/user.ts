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
  completion_percent: z.number().int().min(0).max(100),
  latest_version: z.number().int().min(1),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type StudentProfile = z.infer<typeof StudentProfileSchema>;
