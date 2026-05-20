import { IsString, IsNotEmpty, IsArray, IsOptional, IsEnum, IsDateString, IsObject, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectStatus } from '../schemas/project.schema';

export class CreateProjectDto {
  @ApiProperty({ example: 'Sustainable Coffee Value Chain Initiative', description: 'Project name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Multi-stakeholder project to enhance sustainability in the coffee sector', description: 'Project description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Rwanda', description: 'Member state' })
  @IsString()
  @IsNotEmpty()
  memberState: string;

  @ApiProperty({ example: 'Coffee', description: 'Sector' })
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiPropertyOptional({ enum: ProjectStatus, example: ProjectStatus.PLANNING, description: 'Project status' })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;

  @ApiPropertyOptional({ example: ['507f1f77bcf86cd799439011'], description: 'Stakeholder user IDs' })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  stakeholders?: string[];

  @ApiPropertyOptional({ example: ['Ministry of Trade', 'BSO', 'Private Sector'], description: 'Stakeholder types' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  stakeholderTypes?: string[];

  @ApiPropertyOptional({ example: ['Improve farmer incomes', 'Reduce environmental impact'], description: 'Project objectives' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  objectives?: string[];

  @ApiPropertyOptional({ example: ['SDG 8', 'SDG 12', 'SDG 13'], description: 'Sustainability goals' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sustainabilityGoals?: string[];

  @ApiPropertyOptional({ example: '2024-01-01', description: 'Start date' })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2025-12-31', description: 'End date' })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({
    example: { total: 500000, currency: 'USD', allocated: 300000, spent: 50000 },
    description: 'Budget information'
  })
  @IsObject()
  @IsOptional()
  budget?: {
    total?: number;
    currency?: string;
    allocated?: number;
    spent?: number;
  };

  @ApiPropertyOptional({ example: 25, description: 'Progress percentage' })
  @IsNumber()
  @IsOptional()
  progressPercentage?: number;

  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Creator user ID' })
  @IsMongoId()
  @IsNotEmpty()
  createdBy: string;
}
