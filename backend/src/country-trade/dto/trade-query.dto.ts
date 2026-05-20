import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TradeQueryDto {
  @ApiPropertyOptional({ example: 'Rwanda', description: 'Filter by member state' })
  @IsString()
  @IsOptional()
  memberState?: string;

  @ApiPropertyOptional({ example: 2024, description: 'Filter by year' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by quarter' })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(4)
  @IsOptional()
  quarter?: number;

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
