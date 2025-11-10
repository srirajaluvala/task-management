import bcrypt from "bcryptjs";
import AppDataSource from "../config/data-source";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export const registerUser = async (userData: Partial<User>) => {
    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        const userRepo = UserRepository(transactionalEntityManager);
        const hashedPassword = await bcrypt.hash(userData.password || "", 10);

        return await userRepo.createUser({
            email: userData.email,
            password: hashedPassword,
            role: userData.role,
        });
    });
};

export const getAllUsers = async () => {
    const userRepo = UserRepository();
    return await userRepo.findAllUsers();
};

export const getUserByEmail = async (email: string) => {
    const userRepo = UserRepository();
    return await userRepo.findByEmail(email);
};
