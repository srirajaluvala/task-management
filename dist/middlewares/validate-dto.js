"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validateDto = (dtoClass) => {
    return async (req, res, next) => {
        const dtoObject = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dtoObject, { whitelist: true });
        if (errors.length > 0) {
            const messages = errors.map((error) => Object.values(error.constraints ?? {})).flat();
            return res.status(400).json({ errors: messages });
        }
        // overwrite body with validated object
        req.body = dtoObject;
        next();
    };
};
exports.validateDto = validateDto;
