import express from "express";
import { errorHandler } from "@/middleware/error.js";
import { AppError } from "./shared/errors/AppError.js";
import { ErrorCode } from "@repo/contracts";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Hello from api",
  });
});

app.get("/test-error", (_req, res) => {
  throw new AppError(504, ErrorCode.CONFLICT, "Error Handler Tested Successfully");
});

app.use(errorHandler);

export default app;
