import { User } from '../entities/User'
import AppDataSource from '../config/data-source';

export class UserRepository {
    private repo = AppDataSource.getRepository(User);

    async createUser(user: Partial<User>) {
        const newUser = this.repo.create(user)
        return this.repo.save(newUser)
    }

    async findByEmail(email: string) {
        return this.repo.findBy({ email })
    }

    async findAllUsers() {
        return this.repo.find()
    }

}