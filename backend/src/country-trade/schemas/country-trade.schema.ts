import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryTradeDocument = CountryTrade & Document;

@Schema({ timestamps: true })
export class CountryTrade {
  @Prop({ required: true, trim: true })
  memberState: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  quarter: number;

  @Prop({ required: true })
  totalExports: number;

  @Prop({ required: true })
  totalImports: number;

  @Prop({ required: true })
  tradeBalance: number;

  @Prop({ required: true })
  tradeCompetitivenessIndex: number;

  @Prop({ type: [Object], default: [] })
  topExportSectors: Array<{
    sector: string;
    value: number;
    percentageOfTotal: number;
  }>;

  @Prop({ type: [Object], default: [] })
  topImportSectors: Array<{
    sector: string;
    value: number;
    percentageOfTotal: number;
  }>;

  @Prop({ type: [String], default: [] })
  topExportDestinations: string[];

  @Prop({ type: [String], default: [] })
  topImportOrigins: string[];

  @Prop()
  gdpPercentage: number;

  @Prop()
  recoveryIndicator: number;

  @Prop()
  sustainabilityScore: number;

  @Prop({ type: Object })
  keyMetrics: {
    exportGrowthRate?: number;
    importGrowthRate?: number;
    tradeDiversificationIndex?: number;
    valueAddedExportsPercentage?: number;
  };
}

export const CountryTradeSchema = SchemaFactory.createForClass(CountryTrade);

CountryTradeSchema.index({ memberState: 1, year: -1, quarter: -1 });
CountryTradeSchema.index({ memberState: 1 });
CountryTradeSchema.index({ year: -1 });
