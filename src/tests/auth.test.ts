import request from 'supertest';
import { Application } from 'express';
import express from 'express';
import { registerRoutes } from '../routes';
import { dataSource } from '../config/data-source';

let app: Application;

beforeAll(async () => {
  process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/task_manager_test';
  await dataSource.initialize();
  app = express();
  app.use(express.json());
  registerRoutes(app);
});

afterAll(async () => {
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
});

describe('Auth routes', () => {
  it('should login admin after seeding', async () => {
    // you could call seedDefaultAdmin here or beforeAll
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
  });
});
