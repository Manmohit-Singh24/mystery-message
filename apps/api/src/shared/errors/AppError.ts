import type { ErrorCode, ErrorFields } from "@repo/contracts";

class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly errors?: ErrorFields;

  constructor(statusCode: number, code: ErrorCode, message: string, errors?: ErrorFields) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    if (errors) this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
