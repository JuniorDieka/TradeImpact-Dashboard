import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CountryTradeService } from './country-trade.service';
import { CreateTradeDataDto } from './dto/create-trade-data.dto';
import { TradeQueryDto } from './dto/trade-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@ApiTags('Country Trade')
@Controller('country-trade')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class CountryTradeController {
  constructor(private readonly countryTradeService: CountryTradeService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.POLICY_ANALYST)
  @ApiOperation({ summary: 'Create new trade data entry' })
  @ApiResponse({ status: 201, description: 'Trade data successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden - insufficient permissions' })
  create(@Body() createTradeDataDto: CreateTradeDataDto) {
    return this.countryTradeService.create(createTradeDataDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trade data with optional filtering' })
  @ApiResponse({ status: 200, description: 'Trade data retrieved successfully' })
  @ApiQuery({ name: 'memberState', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({ name: 'quarter', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(@Query() queryDto: TradeQueryDto) {
    return this.countryTradeService.findAll(queryDto);
  }

  @Get('country/:memberState')
  @ApiOperation({ summary: 'Get all trade data for a specific country' })
  @ApiResponse({ status: 200, description: 'Country trade data retrieved successfully' })
  findByCountry(@Param('memberState') memberState: string) {
    return this.countryTradeService.findByCountry(memberState);
  }

  @Get('trends/:memberState')
  @ApiOperation({ summary: 'Get trade trends for a country over recent years' })
  @ApiResponse({ status: 200, description: 'Trade trends retrieved successfully' })
  @ApiQuery({ name: 'years', required: false, description: 'Number of years to look back', type: Number })
  getTrends(
    @Param('memberState') memberState: string,
    @Query('years') years?: number,
  ) {
    return this.countryTradeService.getTrends(memberState, years);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single trade data entry by ID' })
  @ApiResponse({ status: 200, description: 'Trade data retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Trade data not found' })
  findOne(@Param('id') id: string) {
    return this.countryTradeService.findOne(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a trade data entry' })
  @ApiResponse({ status: 200, description: 'Trade data deleted successfully' })
  @ApiResponse({ status: 404, description: 'Trade data not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin only' })
  remove(@Param('id') id: string) {
    return this.countryTradeService.remove(id);
  }
}
