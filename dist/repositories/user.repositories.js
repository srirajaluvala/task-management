"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRepository = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const createUserRepository = () => {
    const repo = data_source_1.dataSource.getRepository(User_1.User);
    const createUser = async (email, passwordHash, role) => {
        const user = repo.create({ email, passwordHash, role });
        return repo.save(user);
    };
    const findByEmail = async (email) => {
        const user = await repo.findOne({ where: { email } });
        return user ?? null;
    };
    const findById = async (id) => {
        const user = await repo.findOne({ where: { id } });
        return user ?? null;
    };
    const listUsers = async () => repo.find();
    const updateRole = async (id, role) => {
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
exports.createUserRepository = createUserRepository;
