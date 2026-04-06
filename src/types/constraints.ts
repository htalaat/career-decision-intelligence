import { z } from "zod";

export const ConstraintSetSchema = z.object({
  id: z.string().uuid(),
  profile_id: z.string().uuid(),
  financial_level: z.enum(["low", "medium", "high", "flexible"]).nullable(),
  location_constraint: z.string().nullable(),
  family_expectation: z.enum(["none", "low", "medium", "high"]).nullable(),
  max_study_years: z.number().int().min(0).max(12).nullable(),
  risk_tolerance: z.enum(["low", "medium", "high"]).nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime(),
});
export type ConstraintSet = z.infer<typeof ConstraintSetSchema>;

export const ConstraintsSubmitSchema = z.object({
  financial_level: z.enum(["low", "medium", "high", "flexible"]),
  location_constraint: z.string().optional(),
  family_expectation: z.enum(["none", "low", "medium", "high"]),
  max_study_years: z.number().int().min(0).max(12).optional(),
  risk_tolerance: z.enum(["low", "medium", "high"]),
  notes: z.string().optional(),
});
export type ConstraintsSubmit = z.infer<typeof ConstraintsSubmitSchema>;
