import { Repository } from "typeorm";
import { dataSource } from "../config/data-source";
import { Project } from "../entities/Project";

export interface ProjectRepository {
  createProject: (payload: Partial<Project>) => Promise<Project>;
  findById: (id: string) => Promise<Project | null>;
  listAll: () => Promise<Project[]>;
  listForUser: (userId: string) => Promise<Project[]>;
  deleteById: (id: string) => Promise<void>;
}

export const createProjectRepository = (): ProjectRepository => {
  const repo: Repository<Project> = dataSource.getRepository(Project);

  const createProject = async (payload: Partial<Project>): Promise<Project> => {
    const project = repo.create(payload);
    return repo.save(project);
  };

  const findById = async (id: string): Promise<Project | null> => {
    const project = await repo.findOne({ where: { id }, relations: ["tasks"] });
    return project ?? null;
  };

  const listAll = async (): Promise<Project[]> => {
    return repo.find({ relations: ["tasks"] });
  };

  const listForUser = async (userId: string): Promise<Project[]> => {
    return repo
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.tasks", "task")
      .leftJoin("task.assignedTo", "user")
      .where("user.id = :userId", { userId })
      .getMany();
  };

  const deleteById = async (id: string): Promise<void> => {
    await repo.delete({ id });
  };

  return {
    createProject,
    findById,
    listAll,
    listForUser,
    deleteById
  };
};
