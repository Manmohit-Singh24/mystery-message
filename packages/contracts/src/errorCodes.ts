const ErrorCode = {
  // 4xx
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // 5xx
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

//(typeof SomeObject)[keyof typeof SomeObject]; give type as Union of all values of SomeObject.
type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export { ErrorCode };
