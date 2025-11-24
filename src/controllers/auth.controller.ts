import { Request, Response } from 'express';
import { createAuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { logger } from '../config/logger';
import { createUserRepository } from '../repositories/user.repositories';

const userRepo = createUserRepository();
const authService = createAuthService(userRepo);

export const registerHandler = async (req: Request, res: Response) => {
  const body = req.body as RegisterDto;
  try {
    const user = await authService.register(body.email, body.password, body.role);
    logger.info(`User registered: ${user.email}`);
    return res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    logger.error(`Register error: ${String(error)}`);
    return res.status(400).json({ message: 'Unable to register' });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  const body = req.body as LoginDto;
  try {
    const token = await authService.login(body.email, body.password);
    return res.json({ token });
  } catch (error) {
    logger.error(`Login error: ${String(error)}`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const profileHandler = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.json({ user: req.user });
};
