import { z } from "zod";

const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

type VerifyEmailDto = z.infer<typeof verifyEmailSchema>;

export { verifyEmailSchema };
export type { VerifyEmailDto };
