import * as z from "zod";

export const EditUserDetailFormAdminPersonaValidation = z.object({
  isAdmin: z.boolean(),
  phoneNumber: z.string().max(10),
  email: z.string().email("Enter a proper email address"),
});
