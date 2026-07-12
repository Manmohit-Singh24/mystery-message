import type { ErrorCode } from "./errorCodes.js";

export interface ErrorResponse {
  success: false;

  error: {
    code: ErrorCode;
    message: string;
  };
}

export interface SuccessResponse<T> {
  success: true;

  data: T;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
