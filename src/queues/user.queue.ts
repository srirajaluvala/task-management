import { Queue } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
  connection: {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379'
  }
};

export interface WelcomeJobData {
  email: string;
}

export const userQueue = new Queue<WelcomeJobData>('userQueue', connection);
