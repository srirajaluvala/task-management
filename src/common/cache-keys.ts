export const adminProjectsKey = 'projects:admin';

export const userProjectsKey = (userId: string): string => `projects:user:${userId}`;

export const taskListKey = (projectId: string, userId: string): string =>
  `tasks:${projectId}:${userId}`;
