import * as z from "zod";

export const AddConsultingCallsSchema = z.object({
  clientId: z.string(),
  interviwerId: z.string(),
  docLink: z.string(),
});
