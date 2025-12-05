import { Repository } from "typeorm";
import { dataSource } from "../config/data-source";
import { Task } from "../entities/Task";

export interface TaskRepository {
  createTask: (data: Partial<Task>) => Promise<Task>;
  findById: (id: string) => Promise<Task | null>;
  listByProject: (projectId: string) => Promise<Task[]>;
  listForUser: (projectId: string, userId: string) => Promise<Task[]>;
  updateTask: (task: Task) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
}

export const createTaskRepository = (): TaskRepository => {
  const repo: Repository<Task> = dataSource.getRepository(Task);

  const createTask = async (data: Partial<Task>): Promise<Task> => {
    const task = repo.create(data);
    return repo.save(task);
  };

  const findById = async (id: string): Promise<Task | null> => {
    const task = await repo.findOne({ where: { id } });
    return task ?? null;
  };

  const listByProject = async (projectId: string): Promise<Task[]> => {
    return repo.find({
      where: { project: { id: projectId } }
    });
  };

  const listForUser = async (projectId: string, userId: string): Promise<Task[]> => {
    return repo.find({
      where: {
        project: { id: projectId },
        assignedTo: { id: userId }
      }
    });
  };

  const updateTask = async (task: Task): Promise<Task> => {
    return repo.save(task);
  };

  const deleteTask = async (id: string): Promise<void> => {
    await repo.delete({ id });
  };

  return {
    createTask,
    findById,
    listByProject,
    listForUser,
    updateTask,
    deleteTask
  };
};
