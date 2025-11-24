import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [User, Project, Task],
  migrations: ['dist/migrations/*.js']
});
