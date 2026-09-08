import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { env } from "@/config/env.js";
import { requestLogger, errorHandler } from "@/shared/middleware/index.js";
import { healthRouter } from "@/modules/health/health.routes.js";
import { NotFoundError } from "@/shared/errors/index.js";
import { resolveAuth } from "./modules/auth/index.js";
import { authRouter } from "./modules/auth/index.js";
import { userRouter } from "./modules/user/index.js";
import { emailQueue } from "./queues/queue.js";

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

// Request Parsing
app.use(cookieParser());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(compression());
app.set("trust proxy", 1);

// Observability
app.use(requestLogger);

// Health Check Route
app.use("/health", healthRouter);

// Auth middleware
app.use(resolveAuth);

// App routes
app.use("/auth", authRouter);

// User routes
app.use("/user", userRouter);

// temp queue testing
let counter = 1;
app.get("/test-queue", async (req, res) => {
  const msg = req.query;
  await emailQueue.add(
    "test",
    { msg, counter },
    {
      attempts: 3,
      backoff: {
        type: "exponential",

        delay: 1000,
      },
    }
  );
  return res.status(200).json({ success: true, data: counter++ });
});

app.use((_req) => {
  throw new NotFoundError("Route not found");
});

// Error Handler
app.use(errorHandler);

export { app };
