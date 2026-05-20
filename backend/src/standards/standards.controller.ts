import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { StandardsService } from './standards.service';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';
import { FilterStandardDto } from './dto/filter-standard.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('Standards')
@Controller('standards')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class StandardsController {
  constructor(private readonly standardsService: StandardsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.POLICY_ANALYST)
  @ApiOperation({ summary: 'Create a new sustainability standard' })
  @ApiResponse({ status: 201, description: 'Standard successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  create(@Body() createStandardDto: CreateStandardDto) {
    return this.standardsService.create(createStandardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all standards with optional filtering' })
  @ApiResponse({ status: 200, description: 'Standards retrieved successfully' })
  @ApiQuery({ name: 'sector', required: false })
  @ApiQuery({ name: 'country', required: false })
  @ApiQuery({ name: 'hotspotCategory', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query() filterDto: FilterStandardDto) {
    return this.standardsService.findAll(filterDto);
  }

  @Get('compare')
  @ApiOperation({ summary: 'Compare multiple standards by IDs' })
  @ApiResponse({ status: 200, description: 'Standards comparison retrieved' })
  @ApiQuery({ name: 'ids', required: true, type: [String], description: 'Comma-separated standard IDs' })
  compare(@Query('ids') ids: string) {
    const idArray = ids.split(',').map(id => id.trim());
    return this.standardsService.compare(idArray);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single standard by ID' })
  @ApiResponse({ status: 200, description: 'Standard retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Standard not found' })
  findOne(@Param('id') id: string) {
    return this.standardsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.POLICY_ANALYST)
  @ApiOperation({ summary: 'Update a standard' })
  @ApiResponse({ status: 200, description: 'Standard updated successfully' })
  @ApiResponse({ status: 404, description: 'Standard not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  update(@Param('id') id: string, @Body() updateStandardDto: UpdateStandardDto) {
    return this.standardsService.update(id, updateStandardDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a standard' })
  @ApiResponse({ status: 200, description: 'Standard deleted successfully' })
  @ApiResponse({ status: 404, description: 'Standard not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin only' })
  remove(@Param('id') id: string) {
    return this.standardsService.remove(id);
  }
}
