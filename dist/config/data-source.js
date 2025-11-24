"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../entities/User");
const Project_1 = require("../entities/Project");
const Task_1 = require("../entities/Task");
dotenv_1.default.config();
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [User_1.User, Project_1.Project, Task_1.Task],
    migrations: ['dist/migrations/*.js']
});
