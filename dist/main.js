"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_source_1 = require("./config/data-source");
const logger_1 = require("./config/logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = Number(process.env.PORT) || 3000;
data_source_1.dataSource.initialize()
    .then(async () => {
    logger_1.logger.info('Database connected');
    // await seedDefaultAdmin();
    app.listen(port, () => {
        logger_1.logger.info(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    logger_1.logger.error(`DB connection error: ${String(error)}`);
});
