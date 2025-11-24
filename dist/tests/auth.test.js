"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes");
const data_source_1 = require("../config/data-source");
let app;
beforeAll(async () => {
    process.env.DATABASE_URL = 'postgres://user:password@localhost:5432/task_manager_test';
    await data_source_1.dataSource.initialize();
    app = (0, express_1.default)();
    app.use(express_1.default.json());
    (0, routes_1.registerRoutes)(app);
});
afterAll(async () => {
    if (data_source_1.dataSource.isInitialized) {
        await data_source_1.dataSource.destroy();
    }
});
describe('Auth routes', () => {
    it('should login admin after seeding', async () => {
        // you could call seedDefaultAdmin here or beforeAll
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        });
        expect(res.status).toBe(200);
        expect(typeof res.body.token).toBe('string');
    });
});
