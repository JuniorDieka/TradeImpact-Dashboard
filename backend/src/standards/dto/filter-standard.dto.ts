import { IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { HotspotCategory } from '../schemas/standard.schema';
import { Type } from 'class-transformer';

export class FilterStandardDto {
  @ApiPropertyOptional({ example: 'Coffee', description: 'Filter by sector' })
  @IsString()
  @IsOptional()
  sector?: string;

  @ApiPropertyOptional({ example: 'Rwanda', description: 'Filter by country' })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({ enum: HotspotCategory, example: HotspotCategory.ENVIRONMENTAL, description: 'Filter by hotspot category' })
  @IsEnum(HotspotCategory)
  @IsOptional()
  hotspotCategory?: HotspotCategory;

  @ApiPropertyOptional({ example: 'fair', description: 'Search by keyword in name or description' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: 1, description: 'Page number', default: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 10, description: 'Items per page', default: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;
}
