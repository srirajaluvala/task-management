import { EntityManager } from "typeorm";
import { User } from "../entities/User";
import AppDataSource from "../config/data-source";

export const UserRepository = (admin?: EntityManager) => {
    const repo = admin
        ? admin.getRepository(User)
        : AppDataSource.getRepository(User);

    const createUser = async (user: Partial<User>) => {
        const newUser = repo.create(user);
        return await repo.save(newUser);
    };

    const findByEmail = async (email: string) => {
        return await repo.findOne({ where: { email } });
    };

    const findAllUsers = async () => {
        return await repo.find();
    };

    return {
        createUser,
        findByEmail,
        findAllUsers,
    };
};
