import type { NextFunction, Request, Response } from "express";
import { ErrorCode, type ErrorResponse } from "@repo/contracts";

import { AppError } from "@/shared/errors/index.js";
import { logger } from "@/shared/logger.js";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) logger.error(err);

    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    } satisfies ErrorResponse);
  }

  return res.status(500).json({
    success: false,
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    },
  } satisfies ErrorResponse);
};
