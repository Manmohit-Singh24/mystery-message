import express from "express";
import { errorHandler } from "@/middleware/error.js";
import { AppError } from "./shared/errors/AppError.js";
import { ErrorCode } from "@repo/contracts";

import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env.js";
import compression from "compression";
import { requestLogger } from "./middleware/requestLogger.js";
import { healthRouter } from "./modules/health/health.routes.js";

const app = express();

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(requestLogger);

app.get("/", (_req, res) => {
  return res.json({
    message: "Hello from api",
  });
});

app.get("/test-error", (_req, res) => {
  throw new AppError(504, ErrorCode.CONFLICT, "Error Handler Tested Successfully");
});

app.use("/health", healthRouter);

app.use(errorHandler);

export default app;
