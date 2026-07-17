import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema, usernameSchema } from "../validation/index.js";

const registerSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

type RegisterDto = z.infer<typeof registerSchema>;

export { registerSchema };
export type { RegisterDto };
