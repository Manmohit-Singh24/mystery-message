import { ErrorCode, type ErrorFields } from "@repo/contracts";

import { AppError } from "./AppError.js";

class ValidationError extends AppError {
  constructor(message = "Validation failed", errors?: ErrorFields) {
    super(422, ErrorCode.VALIDATION_ERROR, message, errors);
  }
}

export { ValidationError };
