import { IsString, IsNotEmpty, IsArray, IsOptional, IsMongoId, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValueChainStage, RiskLevel, ComplianceStatus } from '../schemas/value-chain.schema';

export class StageDto {
  @ApiProperty({ enum: ValueChainStage, example: ValueChainStage.PRODUCTION })
  @IsEnum(ValueChainStage)
  stage: ValueChainStage;

  @ApiProperty({ example: 'Coffee Cherry Harvesting', description: 'Stage name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Musanze District, Rwanda', description: 'Stage location' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: ['Smallholder farmers', 'Cooperative'], description: 'Actors involved' })
  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @ApiProperty({ enum: RiskLevel, example: RiskLevel.MEDIUM })
  @IsEnum(RiskLevel)
  sustainabilityRiskLevel: RiskLevel;

  @ApiProperty({ enum: ComplianceStatus, example: ComplianceStatus.PARTIAL })
  @IsEnum(ComplianceStatus)
  complianceStatus: ComplianceStatus;

  @ApiProperty({ example: ['Water usage', 'Pesticide application'], description: 'Environmental hotspots' })
  @IsArray()
  @IsString({ each: true })
  environmentalHotspots: string[];

  @ApiProperty({ example: ['Fair wages', 'Working hours'], description: 'Social hotspots' })
  @IsArray()
  @IsString({ each: true })
  socialHotspots: string[];

  @ApiProperty({ example: ['Price volatility'], description: 'Economic hotspots' })
  @IsArray()
  @IsString({ each: true })
  economicHotspots: string[];

  @ApiProperty({ example: ['IPM training', 'Water monitoring system'], description: 'Mitigation actions' })
  @IsArray()
  @IsString({ each: true })
  mitigationActions: string[];

  @ApiPropertyOptional({ example: ['Organic', 'Fairtrade'], description: 'Certifications held' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  certifications?: string[];

  @ApiProperty({ example: 65, description: 'Completion percentage (0-100)' })
  @IsNumber()
  completionPercentage: number;
}

export class CreateValueChainDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Arabica Coffee', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ example: 'Coffee', description: 'Sector' })
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiProperty({ example: 'Rwanda', description: 'Member state' })
  @IsString()
  @IsNotEmpty()
  memberState: string;

  @ApiProperty({ type: [StageDto], description: 'Value chain stages' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StageDto)
  stages: StageDto[];
}
