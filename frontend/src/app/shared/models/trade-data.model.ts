export interface TradeData {
  _id?: string;
  memberState: string;
  year: number;
  quarter: number;
  totalExports: number;
  totalImports: number;
  tradeBalance: number;
  tradeCompetitivenessIndex: number;
  topExportSectors: SectorData[];
  topImportSectors: SectorData[];
  topExportDestinations: string[];
  topImportOrigins: string[];
  sectorBreakdown?: SectorBreakdown[];
  topPartners?: TradePartner[];
  gdpPercentage?: number;
  recoveryIndicator?: number;
  sustainabilityScore?: number;
  keyMetrics?: {
    exportGrowthRate?: number;
    importGrowthRate?: number;
    tradeDiversificationIndex?: number;
    valueAddedExportsPercentage?: number;
  };
}

export interface SectorData {
  sector: string;
  value: number;
  percentageOfTotal: number;
}

export interface SectorBreakdown {
  sector: string;
  exportValue: number;
  importValue: number;
  percentageOfTotal: number;
}

export interface TradePartner {
  country: string;
  tradeVolume: number;
  percentageOfTotal: number;
}
