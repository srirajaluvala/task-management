import { Router } from "express";
import {
  createTaskHandler,
  listTasksHandler,
  updateStatusHandler,
  deleteTaskHandler
} from "../controllers/task.controller";
import { authMiddleware, requireRole } from "../middlewares/auth";
import { validateDto } from "../middlewares/validate-dto";
import { CreateTaskDto, UpdateTaskStatusDto } from "../dto/task.dto";

const router = Router();

// Admin creates task
router.post(
  "/projects/:projectId/tasks",
  authMiddleware,
  requireRole(["admin"]),
  validateDto(CreateTaskDto),
  createTaskHandler
);

// Both can view tasks (admin sees all, user sees only assigned)
router.get(
  "/projects/:projectId/tasks",
  authMiddleware,
  listTasksHandler
);

// Both can update status (user only their own)
router.patch(
  "/tasks/:id",
  authMiddleware,
  validateDto(UpdateTaskStatusDto),
  updateStatusHandler
);

// Only admin deletes tasks
router.delete(
  "/tasks/:id",
  authMiddleware,
  requireRole(["admin"]),
  deleteTaskHandler
);

export default router;
