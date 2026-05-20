export enum AssessmentStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  UNDER_REVIEW = 'under_review'
}

export interface Assessment {
  _id?: string;
  userId: string;
  standardId: string;
  companyName: string;
  sector: string;
  memberState: string;
  valueChainPosition?: string;
  status: AssessmentStatus;
  responses?: AssessmentResponses;
  overallScore?: number;
  categoryScores?: CategoryScores;
  gaps?: Gap[];
  roadmap?: RoadmapItem[];
  completedAt?: Date;
  createdAt?: Date;
}

export interface AssessmentResponses {
  environmental?: CategoryResponse;
  social?: CategoryResponse;
  economic?: CategoryResponse;
  quality?: CategoryResponse;
  ethics?: CategoryResponse;
}

export interface CategoryResponse {
  [key: string]: number;
}

export interface CategoryScores {
  environmental?: number;
  social?: number;
  economic?: number;
  quality?: number;
  ethics?: number;
}

export interface Gap {
  category: string;
  criterion: string;
  currentScore: number;
  requiredScore: number;
  priority: string;
  recommendation: string;
}

export interface RoadmapItem {
  milestone: string;
  description: string;
  timeframe: string;
  cost: string;
  priority: string;
}
