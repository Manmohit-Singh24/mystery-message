import { z } from "zod";
import { passwordSchema } from "../validation/fields.js";

const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

export { changePasswordSchema };
export type { ChangePasswordDto };
