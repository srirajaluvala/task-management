import { redisClient } from "../config/redis";
import {
  adminProjectsKey,
  userProjectsKey
} from "../common/cache-keys";
import { createProjectRepository, ProjectRepository } from "../repositories/project.repository";
import { Repository } from "typeorm";
import { dataSource } from "../config/data-source";
import { projectQueue } from "../queues/project.queue";
import { Project } from "../entities/Project";
import { User } from "../entities/User";

export interface ProjectService {
  create: (
    name: string,
    description: string | undefined,
    ownerId: string
  ) => Promise<Project>;
  listForAdmin: () => Promise<Project[]>;
  listForUser: (userId: string) => Promise<Project[]>;
  getById: (id: string) => Promise<Project | null>;
  delete: (id: string) => Promise<void>;
}

export const createProjectService = (): ProjectService => {
  const repo: ProjectRepository = createProjectRepository();
  const userRepo: Repository<User> = dataSource.getRepository(User);

  const create = async (
    name: string,
    description: string | undefined,
    ownerId: string
  ): Promise<Project> => {
    const owner = await userRepo.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new Error("Owner not found");
    }

    const project = await repo.createProject({
      name,
      description: description ?? null,
      owner
    });

    // Clear caches
    await redisClient.del(adminProjectsKey);
    await redisClient.del(userProjectsKey(ownerId));

    // Queue default "welcome task"
    await projectQueue.add("default-task", {
      projectId: project.id,
      ownerId: owner.id
    });

    return project;
  };

  const listForAdmin = async (): Promise<Project[]> => {
    const cached = await redisClient.get(adminProjectsKey);
    if (cached) {
      return JSON.parse(cached) as Project[];
    }

    const projects = await repo.listAll();

   await redisClient.set(adminProjectsKey, JSON.stringify(projects), "EX", 60);


    return projects;
  };

  const listForUser = async (userId: string): Promise<Project[]> => {
    const cacheKey = userProjectsKey(userId);

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached) as Project[];
    }

    const projects = await repo.listForUser(userId);

    await redisClient.set(cacheKey, JSON.stringify(projects),  "EX", 60 );

    return projects;
  };

  const getById = async (id: string): Promise<Project | null> => {
    return repo.findById(id);
  };

  const deleteProject = async (id: string): Promise<void> => {
    await repo.deleteById(id);

    // Invalidate all project caches
    await redisClient.del(adminProjectsKey);
    const keys = await redisClient.keys("projects:user:*");
    for (const k of keys) {
      await redisClient.del(k);
    }
  };

  return {
    create,
    listForAdmin,
    listForUser,
    getById,
    delete: deleteProject
  };
};
