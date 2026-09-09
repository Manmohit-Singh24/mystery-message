class NonRetryableError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "NonRetryableError";
  }
}

class RetryableError extends Error {
  constructor(
    message: string,
    options?: { cause?: unknown },
    public readonly fields?: Record<string, string>
  ) {
    super(message, options);
    this.name = "RetryableError";
  }
}

export { NonRetryableError, RetryableError };
