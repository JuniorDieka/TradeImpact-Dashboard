import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StandardDocument = Standard & Document;

export enum HotspotCategory {
  ENVIRONMENTAL = 'environmental',
  SOCIAL = 'social',
  ECONOMIC = 'economic',
  QUALITY = 'quality',
  ETHICS = 'ethics',
}

@Schema({ timestamps: true })
export class Standard {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  acronym: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, trim: true })
  sector: string;

  @Prop({ type: [String], default: [] })
  applicableCountries: string[];

  @Prop({ type: [String], enum: HotspotCategory, default: [] })
  hotspotCategories: HotspotCategory[];

  @Prop({ trim: true })
  certificationBody?: string;

  @Prop({ trim: true })
  website?: string;

  @Prop()
  isVoluntary: boolean;

  @Prop()
  requiresThirdPartyVerification: boolean;

  @Prop({ type: Object })
  criteria: {
    environmental?: string[];
    social?: string[];
    economic?: string[];
    quality?: string[];
    ethics?: string[];
  };

  @Prop({ type: [String], default: [] })
  memberStates: string[];

  @Prop({ default: 0 })
  adoptionRate: number;

  @Prop()
  lastUpdated: Date;
}

export const StandardSchema = SchemaFactory.createForClass(Standard);

StandardSchema.index({ name: 1 });
StandardSchema.index({ sector: 1 });
StandardSchema.index({ applicableCountries: 1 });
StandardSchema.index({ hotspotCategories: 1 });
StandardSchema.index({ memberStates: 1 });
