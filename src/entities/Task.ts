import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";
import { getMetadataArgsStorage } from "typeorm";

setTimeout(() => {
  const cols = getMetadataArgsStorage().columns.filter(
    (c) => c.target === Task
  );
  console.log(">>> Task columns metadata:");
  console.log(cols);
}, 2000);

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text", { nullable: true })
  description!: string | null;

  @Column({ type: "varchar", default: "medium" })
  priority!: TaskPriority;

  @Column({ type: "varchar", default: "todo" })
  status!: TaskStatus;

  @Column({ type: "timestamptz", nullable: true })
  dueDate!: Date | null;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  assignedTo!: User;

  @ManyToOne(() => Project, (project) => project.tasks, { eager: true })
  project!: Project;
}
