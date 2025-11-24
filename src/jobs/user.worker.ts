import { Worker, Job } from 'bullmq';
import { logger } from '../config/logger';
import { WelcomeJobData } from '../queues/user.queue';
import dotenv from 'dotenv';

dotenv.config();

const worker = new Worker<WelcomeJobData>(
  'userQueue',
  async (job: Job<WelcomeJobData>) => {
    logger.info(`Sending welcome email to ${job.data.email}`);
  },
  {
    connection: {
      url: process.env.REDIS_URL ?? 'redis://localhost:6379'
    }
  }
);

worker.on('failed', (job, err) => {
  logger.error(`Welcome job failed: ${String(err)}`);
});
