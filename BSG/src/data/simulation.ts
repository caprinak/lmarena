import { GameState, Decisions, CompanyStats } from '../types';

const DEFAULT_REGIONAL_STATS = {
  revenue: 62500000,
  unitSales: 1250000,
  marketShare: 10.0,
  inventory: 0,
};

export const INITIAL_STATS: CompanyStats = {
  stockPrice: 30.00,
  totalRevenue: 250000000,
  netProfit: 15000000,
  eps: 1.50,
  roe: 12.5,
  creditRating: 'B+',
  imageRating: 70,
  overallMarketShare: 10.0,
  cash: 50000000,
  totalDebt: 100000000,
  regions: {
    'North America': { ...DEFAULT_REGIONAL_STATS },
    'Europe-Africa': { ...DEFAULT_REGIONAL_STATS },
    'Asia-Pacific': { ...DEFAULT_REGIONAL_STATS },
    'Latin America': { ...DEFAULT_REGIONAL_STATS },
  }
};

export const INITIAL_DECISIONS: Decisions = {
  marketing: {
    'North America': { price: 50, advertising: 500000 },
    'Europe-Africa': { price: 50, advertising: 500000 },
    'Asia-Pacific': { price: 50, advertising: 500000 },
    'Latin America': { price: 50, advertising: 500000 },
  },
  celebrityEndorsement: 0,
  product: {
    quality: 50,
    features: 5,
  },
  production: {
    capacityExpansion: 0,
    automationLevel: 3,
    workforceTraining: 1000000,
  },
  finance: {
    loanRequest: 0,
    dividendPayout: 0.10,
    stockBuyback: 0,
  },
  csr: {
    communitySupport: 0,
    greenInitiatives: 0,
    ethicsTraining: 0,
  },
};

const INITIAL_COMPETITORS = [
  { name: 'Bolt Sports', stockPrice: 28.50, marketShare: 12.5, imageRating: 65, eps: 1.40 },
  { name: 'Swift Footwear', stockPrice: 32.10, marketShare: 11.2, imageRating: 75, eps: 1.65 },
  { name: 'EcoStep Co.', stockPrice: 25.00, marketShare: 8.5, imageRating: 85, eps: 1.10 },
  { name: 'Titan Gear', stockPrice: 40.20, marketShare: 15.0, imageRating: 70, eps: 2.10 },
];

export const INITIAL_GAME_STATE: GameState = {
  currentYear: 10,
  companyName: 'Apex Footwear',
  history: [
    {
      year: 10,
      stats: INITIAL_STATS,
      decisions: INITIAL_DECISIONS,
      competitors: INITIAL_COMPETITORS,
    }
  ],
  currentDecisions: INITIAL_DECISIONS,
};

export function simulateTurn(state: GameState): GameState {
  const currentTurn = state.history[state.history.length - 1];
  const currentStats = currentTurn.stats;
  const decisions = state.currentDecisions;
  
  const regions: (keyof typeof decisions.marketing)[] = ['North America', 'Europe-Africa', 'Asia-Pacific', 'Latin America'];
  
  let totalRevenue = 0;
  let totalUnitSales = 0;
  let totalMarketingCosts = decisions.celebrityEndorsement;
  
  const newRegionalStats: CompanyStats['regions'] = {} as CompanyStats['regions'];

  regions.forEach(region => {
    const regDec = decisions.marketing[region];
    const baseDemand = 1250000;
    const priceEffect = (55 - regDec.price) * 15000;
    const qualityEffect = (decisions.product.quality - 50) * 8000;
    const adEffect = Math.sqrt(regDec.advertising) * 50;
    const celebrityEffect = Math.sqrt(decisions.celebrityEndorsement) * 20;

    const unitSales = Math.max(100000, baseDemand + priceEffect + qualityEffect + adEffect + celebrityEffect);
    const revenue = unitSales * regDec.price;
    
    totalRevenue += revenue;
    totalUnitSales += unitSales;
    totalMarketingCosts += regDec.advertising;

    newRegionalStats[region] = {
      revenue,
      unitSales,
      marketShare: (unitSales / 12500000) * 100,
      inventory: 0,
    };
  });

  const productionCostPerUnit = 25 - (decisions.production.automationLevel * 1.5) + (decisions.product.quality * 0.1);
  const cogs = totalUnitSales * productionCostPerUnit;
  const csrCosts = decisions.csr.communitySupport + decisions.csr.greenInitiatives + decisions.csr.ethicsTraining;
  const interestExpense = currentStats.totalDebt * 0.05;
  
  const totalExpenses = cogs + totalMarketingCosts + decisions.production.workforceTraining + csrCosts + interestExpense;
  const netProfit = totalRevenue - totalExpenses;
  
  const newEps = netProfit / 10000000;
  const newRoe = (netProfit / (currentStats.cash + currentStats.totalDebt)) * 100;
  const csrEffect = (csrCosts / 5000000) * 5;
  const imageRating = Math.min(100, 70 + (decisions.product.quality / 10) + csrEffect);
  
  const newStockPrice = Math.max(5, currentStats.stockPrice * (1 + (newEps / 3) + (newRoe / 80) - 0.1));

  const newStats: CompanyStats = {
    ...currentStats,
    totalRevenue,
    netProfit,
    eps: newEps,
    roe: newRoe,
    stockPrice: newStockPrice,
    imageRating,
    cash: currentStats.cash + netProfit - (decisions.finance.dividendPayout * 10000000) + decisions.finance.loanRequest - decisions.finance.stockBuyback,
    totalDebt: currentStats.totalDebt + decisions.finance.loanRequest,
    overallMarketShare: (totalUnitSales / 50000000) * 100,
    regions: newRegionalStats,
  };

  // Simulate Competitors
  const newCompetitors = currentTurn.competitors.map(c => ({
    ...c,
    stockPrice: c.stockPrice * (0.95 + Math.random() * 0.15),
    marketShare: Math.max(5, c.marketShare + (Math.random() - 0.5) * 2),
    imageRating: Math.min(100, Math.max(50, c.imageRating + (Math.random() - 0.5) * 5)),
    eps: c.eps * (0.9 + Math.random() * 0.3),
  }));

  const nextYear = state.currentYear + 1;
  const newTurnResult = {
    year: nextYear,
    stats: newStats,
    decisions: { ...decisions },
    competitors: newCompetitors,
  };

  return {
    ...state,
    currentYear: nextYear,
    history: [...state.history, newTurnResult],
  };
}
