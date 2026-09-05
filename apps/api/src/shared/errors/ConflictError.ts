import { ErrorCode, type ErrorFields } from "@repo/contracts";

import { AppError } from "./AppError.js";

class ConflictError extends AppError {
  constructor(message = "Conflict", errors?: ErrorFields) {
    super(409, ErrorCode.CONFLICT, message, errors);
  }
}

export { ConflictError };
