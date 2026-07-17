import { z } from "zod";
import { identifierSchema, passwordSchema } from "../validation/index.js";

const loginSchema = z.object({
  identifier: identifierSchema,
  password: passwordSchema,
});

type LoginDto = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginDto };
