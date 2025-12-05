import { Request, Response } from "express";
import { createProjectService } from "../services/project.service";

const service = createProjectService();

export const createProjectHandler = async (req: Request, res: Response) => {
  const body = req.body;
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const project = await service.create(body.name, body.description, user.id);
  return res.status(201).json(project);
};

export const listProjectsHandler = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (user.role === "admin") {
    const projects = await service.listForAdmin();
    return res.json(projects);
  } else {
    const projects = await service.listForUser(user.id);
    return res.json(projects);
  }
};

export const getProjectHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const project = await service.getById(id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.json(project);
};

export const deleteProjectHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  await service.delete(id);
  return res.status(204).send();
};
