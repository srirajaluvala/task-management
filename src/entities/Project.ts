import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class Project {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    projectName?: string;
    @Column()
    description?: string;
    @Column()
    startDate?: Date;
    @Column()
    endDate?: Date;
    @Column({ default: "new" })
    status?: "new" | "active" | "completed" | "on-hold"
    @Column()
    ownerId?: number;
    @Column({ type: "simple-array", nullable: true })
    memberIds?: number[];
}