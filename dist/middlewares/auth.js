"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = header.slice(7);
    const secret = process.env.JWT_SECRET ?? '';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const id = typeof decoded.id === 'string' ? decoded.id : '';
        const role = decoded.role === 'admin' || decoded.role === 'user' ? decoded.role : 'user';
        req.user = { id, role };
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.requireRole = requireRole;
