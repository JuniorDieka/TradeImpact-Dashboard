export enum ValueChainStage {
  PRODUCTION = 'production',
  PROCESSING = 'processing',
  PACKAGING = 'packaging',
  TRANSPORT = 'transport',
  EXPORT = 'export',
  MARKET = 'market'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  PARTIAL = 'partial',
  NON_COMPLIANT = 'non_compliant',
  NOT_ASSESSED = 'not_assessed'
}

export interface ValueChain {
  _id?: string;
  userId: string;
  productName: string;
  sector: string;
  memberState: string;
  stages: Stage[];
  overallRiskScore?: number;
  riskSummary?: {
    environmental: RiskLevel;
    social: RiskLevel;
    economic: RiskLevel;
  };
  recommendations?: Recommendation[];
  lastAssessmentDate?: Date;
  isActive?: boolean;
}

export interface Stage {
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
  certifications?: string[];
  completionPercentage: number;
}

export interface Recommendation {
  stage: ValueChainStage;
  priority: string;
  issue: string;
  action: string;
  estimatedCost: string;
  timeframe: string;
}
