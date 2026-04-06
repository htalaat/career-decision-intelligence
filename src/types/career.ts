import { z } from "zod";

export const CareerPathSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  domain: z.string(),
  summary: z.string(),
  education_path: z.string().nullable(),
  typical_duration_years: z.number().int().nullable(),
  income_potential: z.enum(["low", "medium", "high", "very_high"]).nullable(),
  tags: z.array(z.string()),
  metadata: z.record(z.unknown()),
  active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type CareerPath = z.infer<typeof CareerPathSchema>;

export const CareerTraitMappingSchema = z.object({
  id: z.string().uuid(),
  career_path_id: z.string().uuid(),
  trait_key: z.string(),
  weight: z.number().min(0).max(1),
  rationale: z.string().nullable(),
});
export type CareerTraitMapping = z.infer<typeof CareerTraitMappingSchema>;
