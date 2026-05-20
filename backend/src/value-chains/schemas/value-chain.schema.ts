import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ValueChainDocument = ValueChain & Document;

export enum ValueChainStage {
  PRODUCTION = 'production',
  PROCESSING = 'processing',
  PACKAGING = 'packaging',
  TRANSPORT = 'transport',
  EXPORT = 'export',
  MARKET = 'market',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  PARTIAL = 'partial',
  NON_COMPLIANT = 'non_compliant',
  NOT_ASSESSED = 'not_assessed',
}

@Schema({ timestamps: true })
export class ValueChain {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, trim: true })
  productName: string;

  @Prop({ required: true, trim: true })
  sector: string;

  @Prop({ required: true, trim: true })
  memberState: string;

  @Prop({ type: [Object], required: true })
  stages: Array<{
    stage: ValueChainStage;
    name: string;
    location: string;
    actors: string[];
    sustainabilityRiskLevel: RiskLevel;
    complianceStatus: ComplianceStatus;
    environmentalHotspots: string[];
    socialHotspots: string[];
    economicHotspots: string[];
    mitigationActions: string[];
    certifications: string[];
    completionPercentage: number;
  }>;

  @Prop()
  overallRiskScore: number;

  @Prop({ type: Object })
  riskSummary: {
    environmental: RiskLevel;
    social: RiskLevel;
    economic: RiskLevel;
  };

  @Prop({ type: [Object], default: [] })
  recommendations: Array<{
    stage: ValueChainStage;
    priority: string;
    issue: string;
    action: string;
    estimatedCost: string;
    timeframe: string;
  }>;

  @Prop()
  lastAssessmentDate: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const ValueChainSchema = SchemaFactory.createForClass(ValueChain);

ValueChainSchema.index({ userId: 1, createdAt: -1 });
ValueChainSchema.index({ memberState: 1 });
ValueChainSchema.index({ sector: 1 });
ValueChainSchema.index({ isActive: 1 });
