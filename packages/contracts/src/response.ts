import type { ErrorCode } from "./errorCodes.js";

interface ErrorResponse {
  success: false;

  error: {
    code: ErrorCode;
    message: string;
  };
}

interface SuccessResponse<T> {
  success: true;
  data: T;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type { SuccessResponse, ApiResponse, ErrorResponse };
