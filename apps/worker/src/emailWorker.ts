import { EMAIL_QUEUE_NAME, parseEmailJobData } from "@repo/jobs/email";
import { Job, Worker } from "bullmq";
import { sendEmail } from "./mail/mail.js";
import { env } from "./config/env.js";
import { logger } from "./shared/logger.js";
import { JobLogger } from "./shared/jobLogger.js";

const emailJob = async (job: Job) => {
  const jobLogger = new JobLogger({
    name: job.name,
    id: job.id ?? "NULL",
    info: {},
  });

  job.jobLogger = jobLogger;

  const response = parseEmailJobData(job.data);

  if (!response.success) {
    logger.error(response.error);
    return;
  }

  const data = response.data;

  jobLogger.options.info = {
    to: data.to,
    template: data.template,
  };

  await sendEmail(data);
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
  if (!job) logger.error({ err }, "Job failed but no job instance was available");
  else job.jobLogger.fail(err, { attempt: job.attemptsMade });
});

export { emailWorker };
