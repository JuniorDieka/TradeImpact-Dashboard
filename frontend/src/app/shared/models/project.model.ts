export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  memberState: string;
  sector: string;
  status: ProjectStatus;
  stakeholders: string[];
  stakeholderTypes: string[];
  objectives: string[];
  sustainabilityGoals: string[];
  startDate?: Date;
  endDate?: Date;
  budget?: {
    total?: number;
    currency?: string;
    allocated?: number;
    spent?: number;
  };
  progressPercentage?: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  memberState: string;
  sector: string;
  status?: ProjectStatus;
  stakeholders?: string[];
  stakeholderTypes?: string[];
  objectives?: string[];
  sustainabilityGoals?: string[];
  startDate?: Date;
  endDate?: Date;
  budget?: {
    total?: number;
    currency?: string;
    allocated?: number;
    spent?: number;
  };
}
