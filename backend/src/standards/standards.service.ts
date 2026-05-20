import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Standard, StandardDocument } from './schemas/standard.schema';
import { CreateStandardDto } from './dto/create-standard.dto';
import { UpdateStandardDto } from './dto/update-standard.dto';
import { FilterStandardDto } from './dto/filter-standard.dto';
import { PaginationHelper, PaginatedResult } from '../common/utils/pagination.helper';

@Injectable()
export class StandardsService {
  constructor(
    @InjectModel(Standard.name) private standardModel: Model<StandardDocument>,
  ) {}

  async create(createStandardDto: CreateStandardDto): Promise<Standard> {
    const createdStandard = new this.standardModel({
      ...createStandardDto,
      lastUpdated: new Date(),
    });
    return createdStandard.save();
  }

  async findAll(filterDto: FilterStandardDto): Promise<PaginatedResult<Standard>> {
    const { sector, country, hotspotCategory, search, page = 1, limit = 10 } = filterDto;

    const filter: any = {};

    if (sector) {
      filter.sector = { $regex: sector, $options: 'i' };
    }

    if (country) {
      filter.$or = [
        { applicableCountries: { $regex: country, $options: 'i' } },
        { memberStates: { $regex: country, $options: 'i' } },
      ];
    }

    if (hotspotCategory) {
      filter.hotspotCategories = hotspotCategory;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { acronym: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await this.standardModel.countDocuments(filter);
    const skip = PaginationHelper.getSkip(page, limit);

    const standards = await this.standardModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .exec();

    return PaginationHelper.paginate(standards, total, page, limit);
  }

  async findOne(id: string): Promise<Standard> {
    const standard = await this.standardModel.findById(id).exec();

    if (!standard) {
      throw new NotFoundException(`Standard with ID ${id} not found`);
    }

    return standard;
  }

  async update(id: string, updateStandardDto: UpdateStandardDto): Promise<Standard> {
    const updatedStandard = await this.standardModel
      .findByIdAndUpdate(
        id,
        { ...updateStandardDto, lastUpdated: new Date() },
        { new: true },
      )
      .exec();

    if (!updatedStandard) {
      throw new NotFoundException(`Standard with ID ${id} not found`);
    }

    return updatedStandard;
  }

  async remove(id: string): Promise<void> {
    const result = await this.standardModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Standard with ID ${id} not found`);
    }
  }

  async compare(ids: string[]): Promise<Standard[]> {
    const standards = await this.standardModel.find({ _id: { $in: ids } }).exec();

    if (standards.length !== ids.length) {
      throw new NotFoundException('One or more standards not found');
    }

    return standards;
  }
}
