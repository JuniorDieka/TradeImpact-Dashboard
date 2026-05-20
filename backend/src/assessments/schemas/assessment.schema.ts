import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AssessmentDocument = Assessment & Document;

export enum AssessmentStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  UNDER_REVIEW = 'under_review',
}

@Schema({ timestamps: true })
export class Assessment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Standard', required: true })
  standardId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true })
  companyName: string;

  @Prop({ required: true, trim: true })
  sector: string;

  @Prop({ required: true, trim: true })
  memberState: string;

  @Prop({ trim: true })
  valueChainPosition: string;

  @Prop({ type: String, enum: AssessmentStatus, default: AssessmentStatus.IN_PROGRESS })
  status: AssessmentStatus;

  @Prop({ type: Object, default: {} })
  responses: {
    environmental?: {
      wasteManagement?: number;
      energyEfficiency?: number;
      waterUsage?: number;
      chemicalUsage?: number;
      biodiversity?: number;
    };
    social?: {
      fairWages?: number;
      workingConditions?: number;
      childLabor?: number;
      genderEquality?: number;
      communityEngagement?: number;
    };
    economic?: {
      fairPricing?: number;
      longTermContracts?: number;
      marketAccess?: number;
      financialTransparency?: number;
    };
    quality?: {
      productQuality?: number;
      traceability?: number;
      certificationReadiness?: number;
    };
    ethics?: {
      antiCorruption?: number;
      transparency?: number;
      businessEthics?: number;
    };
  };

  @Prop()
  overallScore: number;

  @Prop({ type: Object })
  categoryScores: {
    environmental?: number;
    social?: number;
    economic?: number;
    quality?: number;
    ethics?: number;
  };

  @Prop({ type: [Object], default: [] })
  gaps: Array<{
    category: string;
    criterion: string;
    currentScore: number;
    requiredScore: number;
    priority: string;
    recommendation: string;
  }>;

  @Prop({ type: [Object], default: [] })
  roadmap: Array<{
    milestone: string;
    description: string;
    timeframe: string;
    cost: string;
    priority: string;
  }>;

  @Prop()
  completedAt?: Date;
}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);

AssessmentSchema.index({ userId: 1, createdAt: -1 });
AssessmentSchema.index({ standardId: 1 });
AssessmentSchema.index({ memberState: 1 });
AssessmentSchema.index({ status: 1 });
