import { EMAIL_QUEUE_NAME, parseEmailJobData, type EmailJobData } from "@repo/jobs/email";
import { Worker } from "bullmq";
import { sendEmail } from "./mail/mail.js";
import { env } from "./config/env.js";
import { logger } from "./shared/logger.js";

const emailWorker = new Worker(
  EMAIL_QUEUE_NAME,
  async (job) => {
    logger.info(`Starting job - ${job.id}`);
    const response = parseEmailJobData(job.data);

    if (!response.success) return logger.info(`${job.id} failed - ${response.error.message}`);

    await sendEmail(response.data);
  },
  {
    connection: {
      url: env.REDIS_URL,
    },
  }
);

emailWorker.on("completed", (job) => {
  logger.info(`Completed job - ${job.id}`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed on attempt ${job?.attemptsMade}`, err.message);
});

export { emailWorker };
