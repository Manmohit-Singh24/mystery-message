import { Worker } from "bullmq";
import { env } from "@/config/env.js";

const worker = new Worker(
  "test",
  async (job) => {
    console.log(job.name);
    console.log(job.data);
    if (job.data.counter % 5 === 0) throw new Error("Test failure"); // testing re-attempts
  },
  { connection: { url: env.REDIS_URL } }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed on attempt ${job?.attemptsMade}`, err.message);
});

console.log("WORKER IS RUNNING");

const shutdown = async () => {
  console.log("Shutting down worker...");

  await worker.close();

  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export { worker };
