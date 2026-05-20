export enum HotspotCategory {
  ENVIRONMENTAL = 'environmental',
  SOCIAL = 'social',
  ECONOMIC = 'economic',
  QUALITY = 'quality',
  ETHICS = 'ethics'
}

export interface Standard {
  _id?: string;
  name: string;
  acronym: string;
  description: string;
  sector: string;
  applicableCountries: string[];
  hotspotCategories: HotspotCategory[];
  certificationBody?: string;
  website?: string;
  isVoluntary: boolean;
  requiresThirdPartyVerification: boolean;
  criteria: {
    environmental?: string[];
    social?: string[];
    economic?: string[];
    quality?: string[];
    ethics?: string[];
  };
  memberStates: string[];
  adoptionRate: number;
  lastUpdated?: Date;
}
