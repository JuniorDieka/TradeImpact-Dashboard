import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProjectDocument = Project & Document;

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, trim: true })
  memberState: string;

  @Prop({ required: true, trim: true })
  sector: string;

  @Prop({ type: String, enum: ProjectStatus, default: ProjectStatus.PLANNING })
  status: ProjectStatus;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User', default: [] })
  stakeholders: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [String], default: [] })
  stakeholderTypes: string[];

  @Prop({ type: [String], default: [] })
  objectives: string[];

  @Prop({ type: [String], default: [] })
  sustainabilityGoals: string[];

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: Object })
  budget: {
    total?: number;
    currency?: string;
    allocated?: number;
    spent?: number;
  };

  @Prop()
  progressPercentage: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ memberState: 1 });
ProjectSchema.index({ sector: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ createdAt: -1 });
