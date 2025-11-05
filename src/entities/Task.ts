import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title?: string;

    @Column()
    description?: string;

    @Column()
    dueDate?: Date;

    @Column({ default: "pending" })
    status?: "pending" | "in-progress" | "completed";

    @Column()
    assigneeId?: number;

    @Column()
    projectId?: number;
}