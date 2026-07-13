import { ErrorCode } from "@repo/contracts";

import { AppError } from "./AppError.js";

class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(422, ErrorCode.VALIDATION_ERROR, message);
  }
}

export { ValidationError };
