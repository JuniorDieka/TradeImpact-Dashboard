import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { StakeholdersService } from './stakeholders.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('Stakeholder Board')
@Controller('stakeholders')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class StakeholdersController {
  constructor(private readonly stakeholdersService: StakeholdersService) {}

  @Post('projects')
  @Roles(UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.STAKEHOLDER)
  @ApiOperation({ summary: 'Create a new stakeholder project' })
  @ApiResponse({ status: 201, description: 'Project successfully created' })
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.stakeholdersService.createProject(createProjectDto);
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get all projects, optionally filtered by member state' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  @ApiQuery({ name: 'memberState', required: false })
  findAllProjects(@Query('memberState') memberState?: string) {
    return this.stakeholdersService.findAllProjects(memberState);
  }

  @Get('projects/:id')
  @ApiOperation({ summary: 'Get a single project by ID' })
  @ApiResponse({ status: 200, description: 'Project retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOneProject(@Param('id') id: string) {
    return this.stakeholdersService.findOneProject(id);
  }

  @Get('projects/:id/stats')
  @ApiOperation({ summary: 'Get project statistics and task summary' })
  @ApiResponse({ status: 200, description: 'Project stats retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  getProjectStats(@Param('id') id: string) {
    return this.stakeholdersService.getProjectStats(id);
  }

  @Patch('projects/:id')
  @Roles(UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.STAKEHOLDER)
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  updateProject(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.stakeholdersService.updateProject(id, updateProjectDto);
  }

  @Delete('projects/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a project and all its tasks' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  removeProject(@Param('id') id: string) {
    return this.stakeholdersService.removeProject(id);
  }

  @Post('tasks')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.stakeholdersService.createTask(createTaskDto);
  }

  @Get('tasks')
  @ApiOperation({ summary: 'Get all tasks with optional filters' })
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiQuery({ name: 'projectId', required: false })
  @ApiQuery({ name: 'assignedTo', required: false })
  findAllTasks(
    @Query('projectId') projectId?: string,
    @Query('assignedTo') assignedTo?: string,
  ) {
    return this.stakeholdersService.findAllTasks(projectId, assignedTo);
  }

  @Get('tasks/:id')
  @ApiOperation({ summary: 'Get a single task by ID' })
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOneTask(@Param('id') id: string) {
    return this.stakeholdersService.findOneTask(id);
  }

  @Patch('tasks/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.stakeholdersService.updateTask(id, updateTaskDto);
  }

  @Delete('tasks/:id')
  @Roles(UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.STAKEHOLDER)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  removeTask(@Param('id') id: string) {
    return this.stakeholdersService.removeTask(id);
  }

  @Post('tasks/:id/comments')
  @ApiOperation({ summary: 'Add a comment to a task' })
  @ApiResponse({ status: 200, description: 'Comment added successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  addComment(@Param('id') id: string, @Body() addCommentDto: AddCommentDto) {
    return this.stakeholdersService.addComment(id, addCommentDto);
  }
}
