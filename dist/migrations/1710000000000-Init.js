"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1710000000000 = void 0;
class Init1710000000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email varchar(255) UNIQUE NOT NULL,
        "passwordHash" varchar(255) NOT NULL,
        role varchar(20) NOT NULL DEFAULT 'user'
      );

      CREATE TABLE projects (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(255) NOT NULL,
        description text,
        "ownerId" uuid REFERENCES users(id) ON DELETE SET NULL
      );

      CREATE TABLE tasks (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title varchar(255) NOT NULL,
        description text,
        priority varchar(20) NOT NULL DEFAULT 'medium',
        status varchar(20) NOT NULL DEFAULT 'todo',
        "dueDate" timestamptz,
        "assignedToId" uuid REFERENCES users(id),
        "projectId" uuid REFERENCES projects(id)
      );
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE tasks;
      DROP TABLE projects;
      DROP TABLE users;
    `);
    }
}
exports.Init1710000000000 = Init1710000000000;
