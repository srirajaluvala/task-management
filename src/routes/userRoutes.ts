import { Router } from "express";
import { register, getAll } from "../controllers/UserController";

const router = Router();

router.post("/users", register);
router.get("/users", getAll);

export default router;
