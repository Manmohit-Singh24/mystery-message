import { ErrorCode } from "@repo/contracts";

import { AppError } from "./AppError.js";

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, ErrorCode.UNAUTHORIZED, message);
  }
}

export { UnauthorizedError };
