import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsArray, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus, TaskPriority } from '../schemas/task.schema';

export class CreateTaskDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439012', description: 'Project ID' })
  @IsMongoId()
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({ example: 'Conduct farmer training on IPM', description: 'Task title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Organize 3-day training for 50 farmers on integrated pest management', description: 'Task description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus, example: TaskStatus.TODO, description: 'Task status' })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority, example: TaskPriority.HIGH, description: 'Task priority' })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiPropertyOptional({ example: '507f1f77bcf86cd799439011', description: 'Assigned user ID' })
  @IsMongoId()
  @IsOptional()
  assignedTo?: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Creator user ID' })
  @IsMongoId()
  @IsNotEmpty()
  createdBy: string;

  @ApiPropertyOptional({ example: '2024-06-30', description: 'Due date' })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @ApiPropertyOptional({ example: ['training', 'sustainability'], description: 'Tags' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
