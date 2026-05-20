import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsObject, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTradeDataDto {
  @ApiProperty({ example: 'Rwanda', description: 'Member state name' })
  @IsString()
  @IsNotEmpty()
  memberState: string;

  @ApiProperty({ example: 2024, description: 'Year of the trade data' })
  @IsNumber()
  @Min(2000)
  @Max(2100)
  year: number;

  @ApiProperty({ example: 1, description: 'Quarter (1-4)' })
  @IsNumber()
  @Min(1)
  @Max(4)
  quarter: number;

  @ApiProperty({ example: 450000000, description: 'Total exports in USD' })
  @IsNumber()
  @Min(0)
  totalExports: number;

  @ApiProperty({ example: 620000000, description: 'Total imports in USD' })
  @IsNumber()
  @Min(0)
  totalImports: number;

  @ApiProperty({ example: -170000000, description: 'Trade balance in USD' })
  @IsNumber()
  tradeBalance: number;

  @ApiProperty({ example: 65.5, description: 'Trade competitiveness index (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  tradeCompetitivenessIndex: number;

  @ApiPropertyOptional({
    example: [
      { sector: 'Coffee', value: 180000000, percentageOfTotal: 40 },
      { sector: 'Tea', value: 90000000, percentageOfTotal: 20 }
    ],
    description: 'Top export sectors'
  })
  @IsArray()
  @IsOptional()
  topExportSectors?: Array<{
    sector: string;
    value: number;
    percentageOfTotal: number;
  }>;

  @ApiPropertyOptional({
    example: [
      { sector: 'Machinery', value: 200000000, percentageOfTotal: 32 },
      { sector: 'Petroleum', value: 150000000, percentageOfTotal: 24 }
    ],
    description: 'Top import sectors'
  })
  @IsArray()
  @IsOptional()
  topImportSectors?: Array<{
    sector: string;
    value: number;
    percentageOfTotal: number;
  }>;

  @ApiPropertyOptional({ example: ['USA', 'Germany', 'Kenya'], description: 'Top export destinations' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  topExportDestinations?: string[];

  @ApiPropertyOptional({ example: ['China', 'UAE', 'India'], description: 'Top import origins' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  topImportOrigins?: string[];

  @ApiPropertyOptional({ example: 12.5, description: 'Trade as percentage of GDP' })
  @IsNumber()
  @IsOptional()
  gdpPercentage?: number;

  @ApiPropertyOptional({ example: 85, description: 'Recovery indicator (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  recoveryIndicator?: number;

  @ApiPropertyOptional({ example: 72, description: 'Sustainability score (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  sustainabilityScore?: number;

  @ApiPropertyOptional({
    example: {
      exportGrowthRate: 8.5,
      importGrowthRate: 6.2,
      tradeDiversificationIndex: 0.65,
      valueAddedExportsPercentage: 35
    },
    description: 'Additional key metrics'
  })
  @IsObject()
  @IsOptional()
  keyMetrics?: {
    exportGrowthRate?: number;
    importGrowthRate?: number;
    tradeDiversificationIndex?: number;
    valueAddedExportsPercentage?: number;
  };
}
