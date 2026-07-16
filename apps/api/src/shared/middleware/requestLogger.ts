import type { NextFunction, Request, Response } from "express";

import { env } from "@/config/env.js";
import { logger } from "@/shared/logger.js";

const IS_DEVELOPMENT = env.NODE_ENV === "development";

type LogMessage = {
  method: string;
  path: string;
  status?: number;
  aborted?: boolean;
  responseTime: string;
};

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const responseTime = getResponseTime(start);
    const log = getLogMessage(req, res, responseTime, "completed");

    if (res.statusCode >= 500) logger.error(log);
    else if (res.statusCode >= 400) logger.warn(log);
    else logger.info(log);
  });

  res.on("close", () => {
    if (res.writableEnded) return;

    const responseTime = getResponseTime(start);
    const log = getLogMessage(req, res, responseTime, "aborted");

    logger.warn(log);
  });

  next();
};

function getResponseTime(start: bigint): string {
  const end = process.hrtime.bigint();
  const durationNs = end - start;
  return (Number(durationNs) / 1_000_000).toFixed(2);
}

function getLogMessage(
  req: Request,
  res: Response,
  responseTime: string,
  logType: "completed" | "aborted"
): string | LogMessage {
  const { method, originalUrl: path } = req;
  const { statusCode } = res;

  if (IS_DEVELOPMENT)
    return `${method} ${path} ${logType === "aborted" ? "ABORTED" : statusCode} (${responseTime} ms) `;

  const logObj: LogMessage = {
    method,
    path,
    responseTime,
  };

  if (logType === "aborted") logObj.aborted = true;
  else logObj.status = statusCode;

  return logObj;
}

export { requestLogger };
