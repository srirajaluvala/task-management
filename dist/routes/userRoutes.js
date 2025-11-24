"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.post("/users", UserController_1.register);
router.get("/users", UserController_1.getAll);
exports.default = router;
