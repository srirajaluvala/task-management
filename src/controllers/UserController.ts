import { Request, Response } from "express";
import { registerUser, getAllUsers } from "../services/UserService";

export const register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    try {
        const user = await registerUser({ email, password, role });
        return res.status(201).json({
            id: user.id,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};
