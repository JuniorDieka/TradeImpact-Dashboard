import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryTrade, CountryTradeDocument } from './schemas/country-trade.schema';
import { CreateTradeDataDto } from './dto/create-trade-data.dto';
import { TradeQueryDto } from './dto/trade-query.dto';
import { PaginationHelper, PaginatedResult } from '../common/utils/pagination.helper';

@Injectable()
export class CountryTradeService {
  constructor(
    @InjectModel(CountryTrade.name) private countryTradeModel: Model<CountryTradeDocument>,
  ) {}

  async create(createTradeDataDto: CreateTradeDataDto): Promise<CountryTrade> {
    const createdTradeData = new this.countryTradeModel(createTradeDataDto);
    return createdTradeData.save();
  }

  async findAll(queryDto: TradeQueryDto): Promise<PaginatedResult<CountryTrade>> {
    const { memberState, year, quarter, page = 1, limit = 10 } = queryDto;

    const filter: any = {};

    if (memberState) {
      filter.memberState = { $regex: memberState, $options: 'i' };
    }

    if (year) {
      filter.year = year;
    }

    if (quarter) {
      filter.quarter = quarter;
    }

    const total = await this.countryTradeModel.countDocuments(filter);
    const skip = PaginationHelper.getSkip(page, limit);

    const tradeData = await this.countryTradeModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ year: -1, quarter: -1 })
      .exec();

    return PaginationHelper.paginate(tradeData, total, page, limit);
  }

  async findOne(id: string): Promise<CountryTrade> {
    const tradeData = await this.countryTradeModel.findById(id).exec();

    if (!tradeData) {
      throw new NotFoundException(`Trade data with ID ${id} not found`);
    }

    return tradeData;
  }

  async findByCountry(memberState: string): Promise<CountryTrade[]> {
    return this.countryTradeModel
      .find({ memberState: { $regex: memberState, $options: 'i' } })
      .sort({ year: -1, quarter: -1 })
      .exec();
  }

  async getTrends(memberState: string, years: number = 5): Promise<CountryTrade[]> {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - years;

    return this.countryTradeModel
      .find({
        memberState: { $regex: memberState, $options: 'i' },
        year: { $gte: startYear },
      })
      .sort({ year: 1, quarter: 1 })
      .exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.countryTradeModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Trade data with ID ${id} not found`);
    }
  }
}
