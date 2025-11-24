"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileHandler = exports.loginHandler = exports.registerHandler = void 0;
const auth_service_1 = require("../services/auth.service");
const logger_1 = require("../config/logger");
const user_repositories_1 = require("../repositories/user.repositories");
const userRepo = (0, user_repositories_1.createUserRepository)();
const authService = (0, auth_service_1.createAuthService)(userRepo);
const registerHandler = async (req, res) => {
    const body = req.body;
    try {
        const user = await authService.register(body.email, body.password, body.role);
        logger_1.logger.info(`User registered: ${user.email}`);
        return res.status(201).json({
            id: user.id,
            email: user.email,
            role: user.role
        });
    }
    catch (error) {
        logger_1.logger.error(`Register error: ${String(error)}`);
        return res.status(400).json({ message: 'Unable to register' });
    }
};
exports.registerHandler = registerHandler;
const loginHandler = async (req, res) => {
    const body = req.body;
    try {
        const token = await authService.login(body.email, body.password);
        return res.json({ token });
    }
    catch (error) {
        logger_1.logger.error(`Login error: ${String(error)}`);
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.loginHandler = loginHandler;
const profileHandler = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ user: req.user });
};
exports.profileHandler = profileHandler;
