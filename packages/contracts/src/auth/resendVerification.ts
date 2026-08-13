import { z } from "zod";
import { emailSchema } from "../validation/fields.js";

const resendVerificationSchema = z.object({
  email: emailSchema,
});

type ResendVerificationlDto = z.infer<typeof resendVerificationSchema>;

export { resendVerificationSchema };
export type { ResendVerificationlDto };
