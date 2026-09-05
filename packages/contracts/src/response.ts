import type { ErrorCode } from "./errorCodes.js";

type ErrorFields = Record<string, string>;

interface ErrorResponse {
  success: false;
  code: ErrorCode;
  message: string;
  errors?: ErrorFields;
}

interface SuccessResponse<T> {
  success: true;
  data: T;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type { SuccessResponse, ApiResponse, ErrorResponse, ErrorFields };
