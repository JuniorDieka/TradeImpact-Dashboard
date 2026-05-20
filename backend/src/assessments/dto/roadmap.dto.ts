import { ApiProperty } from '@nestjs/swagger';

export class RoadmapItemDto {
  @ApiProperty()
  milestone: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  timeframe: string;

  @ApiProperty()
  cost: string;

  @ApiProperty()
  priority: string;
}

export class RoadmapDto {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  assessmentId: string;

  @ApiProperty({ type: [RoadmapItemDto] })
  roadmap: RoadmapItemDto[];

  @ApiProperty()
  overallScore: number;

  @ApiProperty()
  targetScore: number;

  @ApiProperty()
  estimatedTimeframe: string;

  @ApiProperty()
  totalEstimatedCost: string;
}
