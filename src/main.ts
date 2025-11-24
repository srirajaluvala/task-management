import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { dataSource } from './config/data-source';
import { logger } from './config/logger';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

const port = Number(process.env.PORT) || 3000;

dataSource.initialize()
  .then(async () => {
    logger.info('Database connected');

    // await seedDefaultAdmin();

    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    logger.error(`DB connection error: ${String(error)}`);
  });
