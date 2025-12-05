import { Request, Response } from "express";
import { createTaskService } from "../services/task.service";
import { CreateTaskDto, UpdateTaskStatusDto } from "../dto/task.dto";

const service = createTaskService();

export const createTaskHandler = async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const body = req.body;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const task = await service.create(body, projectId);
    return res.status(201).json(task);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};

export const listTasksHandler = async (req: Request, res: Response) => {
  const projectId = req.params.projectId;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const tasks = await service.list(projectId, req.user.id, req.user.role);
    return res.json(tasks);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};

export const updateStatusHandler = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const body = req.body;

  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  try {
    const updated = await service.updateStatus(taskId, req.user.id, req.user.role, body.status);
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  try {
    await service.delete(taskId);
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
};
