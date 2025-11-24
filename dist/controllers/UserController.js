"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.register = void 0;
const UserService_1 = require("../services/UserService");
const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await (0, UserService_1.registerUser)({ email, password, role });
        return res.status(201).json({
            id: user.id,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
};
exports.register = register;
const getAll = async (req, res) => {
    try {
        const users = await (0, UserService_1.getAllUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};
exports.getAll = getAll;
