import { z } from "zod";

export const ConsentLogSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  consent_type: z.string(),
  consent_version: z.string(),
  granted: z.boolean(),
  created_at: z.string().datetime(),
});
export type ConsentLog = z.infer<typeof ConsentLogSchema>;
