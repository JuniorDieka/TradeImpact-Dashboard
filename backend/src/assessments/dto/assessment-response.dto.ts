import { ApiProperty } from '@nestjs/swagger';

export class AssessmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  sector: string;

  @ApiProperty()
  memberState: string;

  @ApiProperty()
  overallScore: number;

  @ApiProperty()
  categoryScores: {
    environmental?: number;
    social?: number;
    economic?: number;
    quality?: number;
    ethics?: number;
  };

  @ApiProperty()
  gaps: Array<{
    category: string;
    criterion: string;
    currentScore: number;
    requiredScore: number;
    priority: string;
    recommendation: string;
  }>;

  @ApiProperty()
  roadmap: Array<{
    milestone: string;
    description: string;
    timeframe: string;
    cost: string;
    priority: string;
  }>;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  completedAt?: Date;
}
