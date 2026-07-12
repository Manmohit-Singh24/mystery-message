export const ErrorCode = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",

  VALIDATION_ERROR: "VALIDATION_ERROR",

  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",

  NOT_FOUND: "NOT_FOUND",

  CONFLICT: "CONFLICT",
} as const;

//(typeof SomeObject)[keyof typeof SomeObject]; give type as Union of all values of SomeObject.
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
