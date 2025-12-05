import { Application } from 'express';
import { validateDto } from '../middlewares/validate-dto';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { authMiddleware, requireRole } from '../middlewares/auth';
import {
  registerHandler,
  loginHandler,
  profileHandler
} from '../controllers/auth.controller';
import projectRoutes from './project.routes';
import taskRoutes from './task.routes';

export const registerRoutes = (app: Application) => {
  // Auth
  app.post(
    '/auth/register',
    authMiddleware,
    requireRole(['admin']),
    validateDto(RegisterDto),
    registerHandler
  );
  app.post(
    '/auth/login',
    validateDto(LoginDto),
    loginHandler
  );
  app.get(
    '/auth/profile',
    authMiddleware,
    profileHandler
  );

  app.use("/projects", projectRoutes);
  app.use("/", taskRoutes);
};
