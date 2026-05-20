export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  UNDER_REVIEW = 'under_review',
  COMPLETED = 'completed',
  BLOCKED = 'blocked'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Project {
  _id?: string;
  name: string;
  description: string;
  memberState: string;
  sector: string;
  status: ProjectStatus;
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
  progressPercentage?: number;
  createdBy: string;
  createdAt?: Date;
}

export interface Task {
  _id?: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  createdBy: string;
  dueDate?: Date;
  comments?: Comment[];
  tags?: string[];
  attachments?: string[];
  completedAt?: Date;
  createdAt?: Date;
}

export interface Comment {
  userId: string;
  userName: string;
  comment: string;
  timestamp: Date;
}
