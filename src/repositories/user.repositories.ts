import { Repository } from 'typeorm';
import { dataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';

export interface UserRepository {
  createUser: (email: string, passwordHash: string, role: UserRole) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  listUsers: () => Promise<User[]>;
  updateRole: (id: string, role: UserRole) => Promise<User | null>;
}

export const createUserRepository = (): UserRepository => {
  const repo: Repository<User> = dataSource.getRepository(User);

  const createUser = async (email: string, passwordHash: string, role: UserRole): Promise<User> => {
    const user = repo.create({ email, passwordHash, role });
    return repo.save(user);
  };

  const findByEmail = async (email: string): Promise<User | null> => {
    const user = await repo.findOne({ where: { email } });
    return user ?? null;
  };

  const findById = async (id: string): Promise<User | null> => {
    const user = await repo.findOne({ where: { id } });
    return user ?? null;
  };

  const listUsers = async (): Promise<User[]> => repo.find();

  const updateRole = async (id: string, role: UserRole): Promise<User | null> => {
    const user = await repo.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    user.role = role;
    return repo.save(user);
  };

  return {
    createUser,
    findByEmail,
    findById,
    listUsers,
    updateRole
  };
};
