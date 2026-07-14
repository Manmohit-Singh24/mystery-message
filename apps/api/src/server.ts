// Load environment variables before importing the application.
import { env } from "@/config/env.js";

import { logger } from "@/shared/logger.js";
import { app } from "@/app.js";

const server = app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
      env: env.NODE_ENV,
    },
    "Server started"
  );
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

let isShuttingDown = false;

async function shutdown(signal: "SIGINT" | "SIGTERM") {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info(`${signal} received. Shutting down...`);

  server.close((error) => {
    if (error) {
      logger.error(error, "Failed to close HTTP server.");
      process.exit(1);
    }
    logger.info("HTTP server closed.");
    // Add shutdowns of app's processes here
    process.exit(0);
  });
}
