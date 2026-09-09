import { EMAIL_QUEUE_NAME } from "@repo/jobs/email";
import { Job, UnrecoverableError, Worker } from "bullmq";
import { sendEmail } from "./mail/mail.js";
import { env } from "./config/env.js";
import { logger } from "./shared/logger.js";
import { JobLogger } from "./shared/jobLogger.js";
import { NonRetryableError, RetryableError } from "@/shared/errors/errors.js";
import { validateEmailJobData } from "@/mail/validateEmailJobData.js";

const emailJob = async (job: Job) => {
  const jobLogger = new JobLogger({
    name: job.name,
    id: job.id ?? "NULL",
    info: {},
  });

  job.jobLogger = jobLogger;
  try {
    const data = validateEmailJobData(job.data);

    jobLogger.options.info = {
      to: data.to,
      template: data.template,
    };

    await sendEmail(data);
  } catch (error) {
    if (error instanceof RetryableError) throw error;

    if (error instanceof NonRetryableError) {
      const unrecoverable = new UnrecoverableError(error.message);
      unrecoverable.cause = error;
      throw unrecoverable;
    }

    // Unknown/unexpected error:
    // fail permanently instead of retrying.
    const unrecoverable = new UnrecoverableError("Unexpected error while processing email job.");
    unrecoverable.cause = error;
    throw unrecoverable;
  }
};

const emailWorker = new Worker(EMAIL_QUEUE_NAME, emailJob, {
  connection: {
    url: env.REDIS_URL,
  },
});

emailWorker.on("completed", (job) => {
  job.jobLogger.complete();
});

emailWorker.on("failed", (job, err) => {
  if (!job) {
    logger.error({ err }, "Job failed but no job instance was available");
    return;
  }

  job.jobLogger.fail(err, {
    attempt: job.attemptsMade,
  });
});

export { emailWorker };
