import { ErrorCode, type ErrorFields } from "@repo/contracts";

import { AppError } from "./AppError.js";

class NotFoundError extends AppError {
  constructor(message = "Resource not found", errors?: ErrorFields) {
    super(404, ErrorCode.NOT_FOUND, message, errors);
  }
}

export { NotFoundError };
