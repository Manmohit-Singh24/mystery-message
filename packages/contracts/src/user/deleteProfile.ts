import { z } from "zod";
import { passwordSchema } from "../validation/fields.js";

const deleteProfileSchema = z.object({
  password: passwordSchema,
});

type DeleteProfileDto = z.infer<typeof deleteProfileSchema>;

export { deleteProfileSchema };
export type { DeleteProfileDto };
