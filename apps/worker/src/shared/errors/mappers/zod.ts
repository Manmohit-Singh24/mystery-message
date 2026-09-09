import { ZodError } from "zod";
import { NonRetryableError } from "../errors.js";

const mapZodError = (error: ZodError): NonRetryableError => {
  const fields: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".") || "root";

    fields[field] ??= issue.message;
  }

  return new NonRetryableError("Validation failed.", {
    fields,
  });
};

export { mapZodError };
