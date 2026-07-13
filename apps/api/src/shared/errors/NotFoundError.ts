import { ErrorCode } from "@repo/contracts";

import { AppError } from "./AppError.js";

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, ErrorCode.NOT_FOUND, message);
  }
}

export { NotFoundError };
