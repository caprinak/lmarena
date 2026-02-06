export interface CompanyStats {
  stockPrice: number;
  revenue: number;
  netProfit: number;
  eps: number; // Earnings per share
  roe: number; // Return on equity
  creditRating: string;
  imageRating: number;
  marketShare: number;
  cash: number;
  totalDebt: number;
}

export interface Decisions {
  marketing: {
    price: number;
    advertising: number;
    celebrityEndorsement: number;
  };
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
}

export interface TurnResult {
  year: number;
  stats: CompanyStats;
  decisions: Decisions;
}

export interface GameState {
  currentYear: number;
  companyName: string;
  history: TurnResult[];
  currentDecisions: Decisions;
}
