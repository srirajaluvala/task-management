import { Queue } from "bullmq";

export interface DefaultTaskJob {
  projectId: string;
  ownerId: string;
}

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

export const projectQueue = new Queue<DefaultTaskJob>("projectQueue", {
  connection: { url: redisUrl }
});
