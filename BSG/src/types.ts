export type Region = 'North America' | 'Europe-Africa' | 'Asia-Pacific' | 'Latin America';

export interface RegionalStats {
  revenue: number;
  unitSales: number;
  marketShare: number;
  inventory: number;
}

export interface CompanyStats {
  stockPrice: number;
  totalRevenue: number;
  netProfit: number;
  eps: number; // Earnings per share
  roe: number; // Return on equity
  creditRating: string;
  imageRating: number;
  overallMarketShare: number;
  cash: number;
  totalDebt: number;
  regions: Record<Region, RegionalStats>;
}

export interface RegionalDecisions {
  price: number;
  advertising: number;
}

export interface Decisions {
  marketing: Record<Region, RegionalDecisions>;
  celebrityEndorsement: number;
  product: {
    quality: number; // 1 to 100
    features: number; // 1 to 10
  };
  production: {
    capacityExpansion: number;
    automationLevel: number;
    workforceTraining: number;
  };
  finance: {
    loanRequest: number;
    dividendPayout: number;
    stockBuyback: number;
  };
  csr: {
    communitySupport: number;
    greenInitiatives: number;
    ethicsTraining: number;
  };
}

export interface CompetitorStats {
  name: string;
  stockPrice: number;
  marketShare: number;
  imageRating: number;
  eps: number;
}

export interface TurnResult {
  year: number;
  stats: CompanyStats;
  decisions: Decisions;
  competitors: CompetitorStats[];
}

export interface GameState {
  currentYear: number;
  companyName: string;
  history: TurnResult[];
  currentDecisions: Decisions;
}
