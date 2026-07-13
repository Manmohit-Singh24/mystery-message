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
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "100kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  })
);

app.use(cookieParser());

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
