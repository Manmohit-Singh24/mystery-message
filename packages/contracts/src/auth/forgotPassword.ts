import { z } from "zod";
import { emailSchema } from "../validation/fields.js";

const forgotPasswordSchema = z.object({
  email: emailSchema,
});

type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export { forgotPasswordSchema };
export type { ForgotPasswordDto };
