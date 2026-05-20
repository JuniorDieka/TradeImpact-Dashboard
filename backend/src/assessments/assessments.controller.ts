import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('Assessments')
@Controller('assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new MSME sustainability assessment' })
  @ApiResponse({ status: 201, description: 'Assessment successfully created' })
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentsService.create(createAssessmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assessments, optionally filtered by user' })
  @ApiResponse({ status: 200, description: 'Assessments retrieved successfully' })
  @ApiQuery({ name: 'userId', required: false })
  findAll(@Query('userId') userId?: string) {
    return this.assessmentsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single assessment by ID' })
  @ApiResponse({ status: 200, description: 'Assessment retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Assessment not found' })
  findOne(@Param('id') id: string) {
    return this.assessmentsService.findOne(id);
  }

  @Get(':id/roadmap')
  @ApiOperation({ summary: 'Get sustainability improvement roadmap for an assessment' })
  @ApiResponse({ status: 200, description: 'Roadmap retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Assessment not found' })
  getRoadmap(@Param('id') id: string) {
    return this.assessmentsService.getRoadmap(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an assessment' })
  @ApiResponse({ status: 200, description: 'Assessment updated successfully' })
  @ApiResponse({ status: 404, description: 'Assessment not found' })
  update(@Param('id') id: string, @Body() updateData: Partial<CreateAssessmentDto>) {
    return this.assessmentsService.update(id, updateData);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MSME_USER)
  @ApiOperation({ summary: 'Delete an assessment' })
  @ApiResponse({ status: 200, description: 'Assessment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Assessment not found' })
  remove(@Param('id') id: string) {
    return this.assessmentsService.remove(id);
  }
}
