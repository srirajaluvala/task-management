"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskListKey = exports.userProjectsKey = exports.adminProjectsKey = void 0;
exports.adminProjectsKey = 'projects:admin';
const userProjectsKey = (userId) => `projects:user:${userId}`;
exports.userProjectsKey = userProjectsKey;
const taskListKey = (projectId, userId) => `tasks:${projectId}:${userId}`;
exports.taskListKey = taskListKey;
