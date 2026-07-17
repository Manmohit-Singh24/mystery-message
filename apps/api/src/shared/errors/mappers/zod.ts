import { ZodError } from "zod";

import { type AppError, type ErrorFields, BadRequestError } from "@/shared/errors/index.js";

const mapZodError = (err: unknown): AppError | null => {
  if (!(err instanceof ZodError)) return null;

  const errors: ErrorFields = {};

  for (const issue of err.issues) {
    const field = issue.path.join(".") || "root";

    errors[field] ??= issue.message;
  }

  return new BadRequestError("Validation failed.", errors);
};

export { mapZodError };
