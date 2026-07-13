import { env } from "@/config/env.js";
import { logger } from "@/shared/logger.js";
import type { NextFunction, Request, Response } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationNs = end - start;
    const responseTime = (Number(durationNs) / 1_000_000).toFixed(2);

    let logMsg: string | Record<string, unknown>;

    if (env.NODE_ENV === "production") {
      logMsg = {
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        responseTime,
      };
    } else logMsg = `${req.method} ${req.originalUrl} ${res.statusCode} (${responseTime} ms) `;

    if (res.statusCode >= 500) logger.error(logMsg);
    else if (res.statusCode >= 400) logger.warn(logMsg);
    else logger.info(logMsg);
  });

  res.on("close", () => {
    if (res.writableEnded) return;

    const end = process.hrtime.bigint();
    const durationNs = end - start;
    const responseTime = (Number(durationNs) / 1_000_000).toFixed(2);

    let logMsg: string | Record<string, unknown>;

    if (env.NODE_ENV === "production") {
      logMsg = {
        method: req.method,
        path: req.originalUrl,
        responseTime,
        aborted: true,
      };
    } else logMsg = `${req.method} ${req.originalUrl} ABORTED ( ${responseTime} ms ) `;

    logger.warn(logMsg);
  });

  next();
};

export { requestLogger };
