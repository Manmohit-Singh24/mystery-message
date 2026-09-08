import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(
    ["development", "production"],
    "NODE_ENV must be either 'development' or 'production'."
  ),

  REDIS_URL: z.string().trim().min(1, "REDIS_URL is required."),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(`
\x1b[31m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\x1b[1mERROR: ENVIRONMENT VARIABLES VALIDATION FAILED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m

${z.prettifyError(parsed.error)}

\x1b[90m Application startup aborted. \x1b[0m
`);

  process.exit(1);
}

const env = parsed.data;

export { env };
