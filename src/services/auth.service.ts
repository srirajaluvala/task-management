import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../entities/User';
import { UserRepository } from '../repositories/user.repositories';

export interface AuthService {
  register: (email: string, password: string, role: UserRole) => Promise<User>;
  login: (email: string, password: string) => Promise<string>;
}

export const createAuthService = (userRepo: UserRepository): AuthService => {
  const register = async (email: string, password: string, role: UserRole): Promise<User> => {
    const existing = await userRepo.findByEmail(email);
    if (existing) {
      throw new Error('Email already in use');
    }
    const hash = await bcrypt.hash(password, 10);
    return userRepo.createUser(email, hash, role);
  };

  const login = async (email: string, password: string): Promise<string> => {
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      throw new Error('Invalid credentials');
    }
    const secret = process.env.JWT_SECRET ?? '';
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });
    return token;
  };

  return { register, login };
};
