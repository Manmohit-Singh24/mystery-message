import { z } from "zod";
import { passwordSchema } from "../validation/fields.js";

const deactivateProfileSchema = z.object({
  password: passwordSchema,
});

type DeactivateProfileDto = z.infer<typeof deactivateProfileSchema>;

export { deactivateProfileSchema };
export type { DeactivateProfileDto };
