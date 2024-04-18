import * as z from "zod";

export const AddUserDetailFormValidation = z.object({
  brokerName: z.string(),
  phoneNumber: z.number(),
  investmentGoal: z.string(),
  riskTakingCapacity: z.string(),
});
