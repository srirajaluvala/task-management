"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDefaultAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("../config/data-source");
const logger_1 = require("../config/logger");
const user_repositories_1 = require("../repositories/user.repositories");
dotenv_1.default.config();
const seedDefaultAdmin = async () => {
    if (!data_source_1.dataSource.isInitialized) {
        await data_source_1.dataSource.initialize();
    }
    const userRepo = (0, user_repositories_1.createUserRepository)();
    const email = process.env.ADMIN_EMAIL ?? 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD ?? 'admin123';
    const existing = await userRepo.findByEmail(email);
    if (existing) {
        logger_1.logger.info('Default admin already exists');
        return;
    }
    const hash = await bcryptjs_1.default.hash(password, 10);
    const role = 'admin';
    const user = await userRepo.createUser(email, hash, role);
    logger_1.logger.info(`Default admin created: ${user.email}`);
};
exports.seedDefaultAdmin = seedDefaultAdmin;
