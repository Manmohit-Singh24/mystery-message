import { ErrorCode, type ErrorFields } from "@repo/contracts";

import { AppError } from "./AppError.js";

class ForbiddenError extends AppError {
  constructor(message = "Forbidden", errors?: ErrorFields) {
    super(403, ErrorCode.FORBIDDEN, message, errors);
  }
}

export { ForbiddenError };
