import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from 'bcryptjs';

export class UserService {
    private userRepository = new UserRepository();

    async registerUser(userData: Partial<User>) {
        const hashedPassword = await bcrypt.hash(userData.password || '', 10)
        return await this.userRepository.createUser({ email: userData.email, password: hashedPassword, role: userData.role })
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findByEmail(email)
    }

    async getAllUsers() {
        return await this.userRepository.findAllUsers()
    }

}