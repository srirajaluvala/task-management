import { createTaskRepository, TaskRepository } from "../repositories/task.repository";
import { Repository } from "typeorm";
import { dataSource } from "../config/data-source";
import { redisClient } from "../config/redis";
import { Task } from "../entities/Task";
import { User } from "../entities/User";
import { Project } from "../entities/Project";
import { taskListKey } from "../common/cache-keys";

export interface TaskService {
  create: (
    body: {
      title: string;
      description?: string;
      priority: "low" | "medium" | "high";
      dueDate?: string;
      assignedToId: string;
    },
    projectId: string,
  ) => Promise<Task>;

  list: (projectId: string, userId: string, role: "admin" | "user") => Promise<Task[]>;

  updateStatus: (
    taskId: string,
    userId: string,
    role: "admin" | "user",
    status: "todo" | "in_progress" | "done"
  ) => Promise<Task>;

  delete: (taskId: string) => Promise<void>;
}

export const createTaskService = (): TaskService => {
  const taskRepo: TaskRepository = createTaskRepository();
  const userRepo: Repository<User> = dataSource.getRepository(User);
  const projectRepo: Repository<Project> = dataSource.getRepository(Project);

  const create: TaskService["create"] = async (body, projectId) => {
    const project = await projectRepo.findOne({ where: { id: projectId } });
    if (!project) throw new Error("Project not found");

    const assignedTo = await userRepo.findOne({ where: { id: body.assignedToId } });
    if (!assignedTo) throw new Error("Assigned user not found");

    const newTask = await taskRepo.createTask({
      title: body.title,
      description: body.description ?? null,
      priority: body.priority,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      project,
      assignedTo
    });

    // Invalidate cache for ALL users assigned to this project
    const keys = await redisClient.keys(`tasks:${projectId}:*`);
    for (const k of keys) await redisClient.del(k);

    return newTask;
  };

  const list: TaskService["list"] = async (projectId, userId, role) => {
    const cacheKey = taskListKey(projectId, userId);

    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    let tasks: Task[];

    if (role === "admin") {
      tasks = await taskRepo.listByProject(projectId);
    } else {
      tasks = await taskRepo.listForUser(projectId, userId);
    }

    await redisClient.set(cacheKey, JSON.stringify(tasks), "EX", 60);

    return tasks;
  };

  const updateStatus: TaskService["updateStatus"] = async (taskId, userId, role, status) => {
    const task = await taskRepo.findById(taskId);
    if (!task) throw new Error("Task not found");

    // User can only update their own tasks
    if (role === "user" && task.assignedTo.id !== userId) {
      throw new Error("Forbidden");
    }

    task.status = status;
    const updated = await taskRepo.updateTask(task);

    // Invalidate cache
    const userKey = taskListKey(task.project.id, userId);
    await redisClient.del(userKey);

    const allKeys = await redisClient.keys(`tasks:${task.project.id}:*`);
    for (const k of allKeys) await redisClient.del(k);

    return updated;
  };

  const deleteTask: TaskService["delete"] = async (taskId) => {
    const task = await taskRepo.findById(taskId);
    if (!task) throw new Error("Task not found");

    await taskRepo.deleteTask(taskId);

    // Invalidate cache
    const keys = await redisClient.keys(`tasks:${task.project.id}:*`);
    for (const k of keys) await redisClient.del(k);
  };

  return {
    create,
    list,
    updateStatus,
    delete: deleteTask
  };
};
