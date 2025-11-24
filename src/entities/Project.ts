import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { Task } from './Task';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string | null;

  @ManyToOne(() => User, (user) => user.projects, { eager: true })
  owner!: User;

  @OneToMany(() => Task, (task) => task.project)
  tasks!: Task[];
}
