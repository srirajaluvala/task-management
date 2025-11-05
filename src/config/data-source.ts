import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Task } from '../entities/Task';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    entities: [User, Task, Project],
    synchronize: true,
})

export default AppDataSource;
