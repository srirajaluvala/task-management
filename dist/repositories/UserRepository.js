"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
const data_source_1 = __importDefault(require("../config/data-source"));
const UserRepository = (admin) => {
    const repo = admin
        ? admin.getRepository(User_1.User)
        : data_source_1.default.getRepository(User_1.User);
    const createUser = async (user) => {
        const newUser = repo.create(user);
        return await repo.save(newUser);
    };
    const findByEmail = async (email) => {
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
exports.UserRepository = UserRepository;
