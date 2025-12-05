import {
  IsString,
  IsOptional,
  IsIn,
  IsDateString
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(['low', 'medium', 'high'])
  priority!: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsString()
  assignedToId!: string;
}

export class UpdateTaskStatusDto {
  @IsIn(['todo', 'in_progress', 'done'])
  status!: 'todo' | 'in_progress' | 'done';
}
