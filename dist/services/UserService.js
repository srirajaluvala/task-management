"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.getAllUsers = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const data_source_1 = __importDefault(require("../config/data-source"));
const UserRepository_1 = require("../repositories/UserRepository");
const registerUser = async (userData) => {
    return await data_source_1.default.transaction(async (transactionalEntityManager) => {
        const userRepo = (0, UserRepository_1.UserRepository)(transactionalEntityManager);
        const hashedPassword = await bcryptjs_1.default.hash(userData.password || "", 10);
        return await userRepo.createUser({
            email: userData.email,
            password: hashedPassword,
            role: userData.role,
        });
    });
};
exports.registerUser = registerUser;
const getAllUsers = async () => {
    const userRepo = (0, UserRepository_1.UserRepository)();
    return await userRepo.findAllUsers();
};
exports.getAllUsers = getAllUsers;
const getUserByEmail = async (email) => {
    const userRepo = (0, UserRepository_1.UserRepository)();
    return await userRepo.findByEmail(email);
};
exports.getUserByEmail = getUserByEmail;
