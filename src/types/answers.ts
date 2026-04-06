import { z } from "zod";

export const ProfileAnswerSchema = z.object({
  id: z.string().uuid(),
  profile_id: z.string().uuid(),
  question_key: z.string(),
  answer_value: z.unknown(),
  version: z.number().int().min(1),
  created_at: z.string().datetime(),
});
export type ProfileAnswer = z.infer<typeof ProfileAnswerSchema>;

/** Shape for submitting an answer during onboarding */
export const AnswerSubmitSchema = z.object({
  question_key: z.string(),
  answer_value: z.unknown(),
});
export type AnswerSubmit = z.infer<typeof AnswerSubmitSchema>;
