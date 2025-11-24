"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const validate_dto_1 = require("../middlewares/validate-dto");
const auth_dto_1 = require("../dto/auth.dto");
const auth_1 = require("../middlewares/auth");
const auth_controller_1 = require("../controllers/auth.controller");
// You will also import project/task controllers
const registerRoutes = (app) => {
    // Auth
    app.post('/auth/register', auth_1.authMiddleware, (0, auth_1.requireRole)(['admin']), (0, validate_dto_1.validateDto)(auth_dto_1.RegisterDto), auth_controller_1.registerHandler);
    app.post('/auth/login', (0, validate_dto_1.validateDto)(auth_dto_1.LoginDto), auth_controller_1.loginHandler);
    app.get('/auth/profile', auth_1.authMiddleware, auth_controller_1.profileHandler);
    // TODO: add /users, /projects, /tasks routes
};
exports.registerRoutes = registerRoutes;
