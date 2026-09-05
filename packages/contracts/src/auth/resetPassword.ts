import { z } from "zod";
import { passwordSchema } from "../validation/fields.js";

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: passwordSchema,
});

type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export { resetPasswordSchema };
export type { ResetPasswordDto };
