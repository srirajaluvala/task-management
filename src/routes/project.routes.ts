import { Router } from "express";
import {
  createProjectHandler,
  listProjectsHandler,
  getProjectHandler,
  deleteProjectHandler
} from "../controllers/project.controller";
import { validateDto } from "../middlewares/validate-dto";
import { CreateProjectDto } from "../dto/project.dto";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole(["admin"]),
  validateDto(CreateProjectDto),
  createProjectHandler
);

router.get("/", authMiddleware, listProjectsHandler);

router.get("/:id", authMiddleware, getProjectHandler);

router.delete("/:id", authMiddleware, requireRole(["admin"]), deleteProjectHandler);

export default router;
