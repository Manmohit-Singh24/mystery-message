import { ErrorCode, type ErrorFields } from "@repo/contracts";

import { AppError } from "./AppError.js";

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", errors?: ErrorFields) {
    super(401, ErrorCode.UNAUTHORIZED, message, errors);
  }
}

export { UnauthorizedError };
