import { env } from "@/config/env.js";
import { Queue } from "bullmq";
import { createClient } from "redis";

// BullMQ uses its own dedicated Redis client.
// Passing the application's already-connected Redis client can cause
// `Socket already opened`, because BullMQ manages the connection lifecycle
// and may call `connect()` on the client itself.

const redis = createClient({ url: env.REDIS_URL });

const emailQueue = new Queue("test", { connection: redis });

export { emailQueue };
