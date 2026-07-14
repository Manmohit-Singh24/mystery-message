import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { env } from "@/config/env.js";
import { requestLogger } from "@/middleware/requestLogger.js";
import { healthRouter } from "@/modules/health/health.routes.js";
import { errorHandler } from "@/middleware/error.js";
import { NotFoundError } from "@/shared/errors/index.js";
import { prisma } from "@/db/prisma.js";

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));

// Request Parsing
app.use(cookieParser());
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(compression());

// Observability
app.use(requestLogger);

// Routes
app.use("/health", healthRouter);

// temp prisma test
app.post("/db-test-msg", async (req, res) => {
  const msg: string = req.body.msg ?? "";

  const dbRes = await prisma.sample.create({
    data: { msg },
  });

  res.status(200).json({
    success: true,
    message: "message added successfully",
    data: dbRes,
  });
});

app.use((_req) => {
  throw new NotFoundError("Route not found");
});

// Error Handler
app.use(errorHandler);

export { app };
