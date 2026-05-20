import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean, IsEnum, IsNumber, IsUrl, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HotspotCategory } from '../schemas/standard.schema';

export class CreateStandardDto {
  @ApiProperty({ example: 'Fairtrade International', description: 'Standard name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'FLO', description: 'Standard acronym' })
  @IsString()
  @IsNotEmpty()
  acronym: string;

  @ApiProperty({ example: 'Promotes fair prices and decent working conditions for farmers', description: 'Standard description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Coffee', description: 'Primary sector' })
  @IsString()
  @IsNotEmpty()
  sector: string;

  @ApiPropertyOptional({ example: ['Rwanda', 'Kenya', 'Ethiopia'], description: 'Applicable countries' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  applicableCountries?: string[];

  @ApiPropertyOptional({ 
    enum: HotspotCategory, 
    isArray: true, 
    example: [HotspotCategory.SOCIAL, HotspotCategory.ECONOMIC],
    description: 'Hotspot categories addressed'
  })
  @IsArray()
  @IsEnum(HotspotCategory, { each: true })
  @IsOptional()
  hotspotCategories?: HotspotCategory[];

  @ApiPropertyOptional({ example: 'Fairtrade International', description: 'Certification body' })
  @IsString()
  @IsOptional()
  certificationBody?: string;

  @ApiPropertyOptional({ example: 'https://www.fairtrade.net', description: 'Official website' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ example: true, description: 'Is this a voluntary standard?' })
  @IsBoolean()
  @IsOptional()
  isVoluntary?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Requires third-party verification?' })
  @IsBoolean()
  @IsOptional()
  requiresThirdPartyVerification?: boolean;

  @ApiPropertyOptional({ 
    example: {
      environmental: ['Biodiversity protection', 'Pesticide reduction'],
      social: ['Fair wages', 'Safe working conditions']
    },
    description: 'Standard criteria by category'
  })
  @IsObject()
  @IsOptional()
  criteria?: {
    environmental?: string[];
    social?: string[];
    economic?: string[];
    quality?: string[];
    ethics?: string[];
  };

  @ApiPropertyOptional({ example: ['Rwanda', 'Uganda'], description: 'Member states where adopted' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  memberStates?: string[];

  @ApiPropertyOptional({ example: 65, description: 'Adoption rate percentage' })
  @IsNumber()
  @IsOptional()
  adoptionRate?: number;
}
