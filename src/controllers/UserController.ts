import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService = new UserService()

    async register(request: Request, response: Response) {
        const { email, password, role } = request.body
        try {
            const user = await this.userService.registerUser({ email, password, role })
            response.status(201).json({ id: user.id, email: user.email, role: user.role })
        } catch (error) {
            return response.status(500).json({ message: 'Error registering user', error })
        }
    }
    async getAll(request: Request, response: Response) {
        try {
            const users = await this.userService.getAllUsers()
            response.status(200).json(users)
        } catch (error) {
            return response.status(500).json({ message: 'Error fetching users', error })
        }
    }
}
