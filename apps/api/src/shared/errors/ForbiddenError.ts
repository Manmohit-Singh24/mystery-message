import { ErrorCode } from "@repo/contracts";

import { AppError } from "./AppError.js";

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(403, ErrorCode.FORBIDDEN, message);
  }
}

export { ForbiddenError };
