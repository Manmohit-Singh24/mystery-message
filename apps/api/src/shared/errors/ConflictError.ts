import { ErrorCode } from "@repo/contracts";

import { AppError } from "./AppError.js";

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(409, ErrorCode.CONFLICT, message);
  }
}

export { ConflictError };
