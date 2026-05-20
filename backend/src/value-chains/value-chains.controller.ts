import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ValueChainsService } from './value-chains.service';
import { CreateValueChainDto } from './dto/create-value-chain.dto';
import { UpdateValueChainDto } from './dto/update-value-chain.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('Value Chains')
@Controller('value-chains')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class ValueChainsController {
  constructor(private readonly valueChainsService: ValueChainsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new value chain tracker' })
  @ApiResponse({ status: 201, description: 'Value chain successfully created' })
  create(@Body() createValueChainDto: CreateValueChainDto) {
    return this.valueChainsService.create(createValueChainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all value chains, optionally filtered by user' })
  @ApiResponse({ status: 200, description: 'Value chains retrieved successfully' })
  @ApiQuery({ name: 'userId', required: false })
  findAll(@Query('userId') userId?: string) {
    return this.valueChainsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single value chain by ID' })
  @ApiResponse({ status: 200, description: 'Value chain retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Value chain not found' })
  findOne(@Param('id') id: string) {
    return this.valueChainsService.findOne(id);
  }

  @Get(':id/hotspots')
  @ApiOperation({ summary: 'Get detailed hotspot analysis for a value chain' })
  @ApiResponse({ status: 200, description: 'Hotspot analysis retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Value chain not found' })
  getHotspotAnalysis(@Param('id') id: string) {
    return this.valueChainsService.getHotspotAnalysis(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a value chain' })
  @ApiResponse({ status: 200, description: 'Value chain updated successfully' })
  @ApiResponse({ status: 404, description: 'Value chain not found' })
  update(@Param('id') id: string, @Body() updateValueChainDto: UpdateValueChainDto) {
    return this.valueChainsService.update(id, updateValueChainDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MSME_USER)
  @ApiOperation({ summary: 'Deactivate a value chain' })
  @ApiResponse({ status: 200, description: 'Value chain deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Value chain not found' })
  remove(@Param('id') id: string) {
    return this.valueChainsService.remove(id);
  }
}
