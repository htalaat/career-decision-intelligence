import { z } from "zod";

const weightField = z.number().int().min(0).max(100);

export const PreferenceWeightsSchema = z.object({
  id: z.string().uuid(),
  profile_id: z.string().uuid(),
  income: weightField,
  stability: weightField,
  flexibility: weightField,
  prestige: weightField,
  creativity: weightField,
  impact: weightField,
  study_duration: weightField,
  risk: weightField,
  created_at: z.string().datetime(),
});
export type PreferenceWeights = z.infer<typeof PreferenceWeightsSchema>;

/** Shape for saving weights from the goals onboarding step */
export const WeightsSubmitSchema = z.object({
  income: weightField,
  stability: weightField,
  flexibility: weightField,
  prestige: weightField,
  creativity: weightField,
  impact: weightField,
  study_duration: weightField,
  risk: weightField,
});
export type WeightsSubmit = z.infer<typeof WeightsSubmitSchema>;
