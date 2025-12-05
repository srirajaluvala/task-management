import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { dataSource } from '../config/data-source';
import { logger } from '../config/logger';
import { createUserRepository } from '../repositories/user.repositories';
import { UserRole } from '../entities/User';

dotenv.config();

export const seedDefaultAdmin = async (): Promise<void> => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const userRepo = createUserRepository();
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD ?? 'admin123';
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    logger.info('Default admin already exists');
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const role: UserRole = 'admin';
  const user = await userRepo.createUser(email, hash, role);
  logger.info(`Default admin created: ${user.email}`);
};
