import { IsString, IsNotEmpty, IsOptional, IsObject, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAssessmentDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'User ID' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439012', description: 'Standard ID to assess against' })
  @IsMongoId()
  @IsNotEmpty()
  standardId: string;

  @ApiProperty({ example: 'Kigali Coffee Cooperative', description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'Coffee', description: 'Business sector' })
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiProperty({ example: 'Rwanda', description: 'Member state' })
  @IsString()
  @IsNotEmpty()
  memberState: string;

  @ApiPropertyOptional({ example: 'Producer', description: 'Position in value chain' })
  @IsString()
  @IsOptional()
  valueChainPosition?: string;

  @ApiPropertyOptional({
    example: {
      environmental: {
        wasteManagement: 7,
        energyEfficiency: 6,
        waterUsage: 8,
        chemicalUsage: 5,
        biodiversity: 6
      },
      social: {
        fairWages: 8,
        workingConditions: 7,
        childLabor: 10,
        genderEquality: 6,
        communityEngagement: 7
      }
    },
    description: 'Assessment responses (scores 0-10)'
  })
  @IsObject()
  @IsOptional()
  responses?: {
    environmental?: {
      wasteManagement?: number;
      energyEfficiency?: number;
      waterUsage?: number;
      chemicalUsage?: number;
      biodiversity?: number;
    };
    social?: {
      fairWages?: number;
      workingConditions?: number;
      childLabor?: number;
      genderEquality?: number;
      communityEngagement?: number;
    };
    economic?: {
      fairPricing?: number;
      longTermContracts?: number;
      marketAccess?: number;
      financialTransparency?: number;
    };
    quality?: {
      productQuality?: number;
      traceability?: number;
      certificationReadiness?: number;
    };
    ethics?: {
      antiCorruption?: number;
      transparency?: number;
      businessEthics?: number;
    };
  };
}
