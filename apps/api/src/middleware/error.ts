import type { NextFunction, Request, Response } from "express";

import { ErrorCode, type ErrorResponse } from "@repo/contracts";

import { AppError } from "@/shared/errors/index.js";
import { logger } from "@/shared/logger.js";
import { mapPrismaError } from "@/shared/error-handlers/prisma.js";

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  // handling Prisma Error
  const error = mapPrismaError(err) ?? err;

  if (error instanceof AppError) {
    if (error.statusCode >= 500) logger.error(err);

    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    } satisfies ErrorResponse);
  }

  logger.error(error);
  return res.status(500).json({
    success: false,
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    },
  } satisfies ErrorResponse);
};

export { errorHandler };
