import * as z from "zod";

export const AddConsultingCallsSchema = z.object({
  clientId: z.string(),
  interviewerId: z.string(),
  docLink: z.string(),
});
