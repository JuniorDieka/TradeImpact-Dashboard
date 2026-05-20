import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'SecurePass123!', description: 'User password (min 8 characters)' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.MSME_USER, description: 'User role' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: 'Kigali Coffee Cooperative', description: 'Organization name' })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiPropertyOptional({ example: 'Rwanda', description: 'Member state/country' })
  @IsString()
  @IsOptional()
  memberState?: string;

  @ApiPropertyOptional({ example: 'Coffee', description: 'Business sector' })
  @IsString()
  @IsOptional()
  sector?: string;
}
