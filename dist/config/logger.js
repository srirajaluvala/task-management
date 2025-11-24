"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const logFormat = printf((info) => {
    return `${info.timestamp} [${info.level.toUpperCase()}]: ${String(info.message)}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp(), logFormat),
    transports: [
        new winston_1.transports.Console()
    ]
});
