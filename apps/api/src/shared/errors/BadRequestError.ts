import { ErrorCode } from "@repo/contracts";

import { AppError } from "./AppError.js";

class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(400, ErrorCode.BAD_REQUEST, message);
  }
}

export { BadRequestError };
