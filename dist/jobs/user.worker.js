"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const logger_1 = require("../config/logger");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const worker = new bullmq_1.Worker('userQueue', async (job) => {
    logger_1.logger.info(`Sending welcome email to ${job.data.email}`);
}, {
    connection: {
        url: process.env.REDIS_URL ?? 'redis://localhost:6379'
    }
});
worker.on('failed', (job, err) => {
    logger_1.logger.error(`Welcome job failed: ${String(err)}`);
});
