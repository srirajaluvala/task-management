"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAuthService = (userRepo) => {
    const register = async (email, password, role) => {
        const existing = await userRepo.findByEmail(email);
        if (existing) {
            throw new Error('Email already in use');
        }
        const hash = await bcryptjs_1.default.hash(password, 10);
        return userRepo.createUser(email, hash, role);
    };
    const login = async (email, password) => {
        const user = await userRepo.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const match = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!match) {
            throw new Error('Invalid credentials');
        }
        const secret = process.env.JWT_SECRET ?? '';
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });
        return token;
    };
    return { register, login };
};
exports.createAuthService = createAuthService;
