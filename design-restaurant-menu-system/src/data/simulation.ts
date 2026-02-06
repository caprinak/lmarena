import { GameState, Decisions, CompanyStats } from '../types';

export const INITIAL_STATS: CompanyStats = {
  stockPrice: 30.00,
  revenue: 250000000,
  netProfit: 15000000,
  eps: 1.50,
  roe: 12.5,
  creditRating: 'B+',
  imageRating: 70,
  marketShare: 10.0,
  cash: 50000000,
  totalDebt: 100000000,
};

export const INITIAL_DECISIONS: Decisions = {
  marketing: {
    price: 50,
    advertising: 2000000,
    celebrityEndorsement: 0,
  },
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
};

export const INITIAL_GAME_STATE: GameState = {
  currentYear: 10,
  companyName: 'Apex Footwear',
  history: [
    {
      year: 10,
      stats: INITIAL_STATS,
      decisions: INITIAL_DECISIONS,
    }
  ],
  currentDecisions: INITIAL_DECISIONS,
};

export function simulateTurn(state: GameState): GameState {
  const currentStats = state.history[state.history.length - 1].stats;
  const decisions = state.currentDecisions;
  
  // Simplified simulation logic
  // Price elasticity
  const baseDemand = 5000000;
  const priceEffect = (60 - decisions.marketing.price) * 50000;
  const qualityEffect = (decisions.product.quality - 50) * 20000;
  const adEffect = Math.sqrt(decisions.marketing.advertising) * 100;
  
  const unitSales = Math.max(1000000, baseDemand + priceEffect + qualityEffect + adEffect);
  const revenue = unitSales * decisions.marketing.price;
  
  // Costs
  const productionCostPerUnit = 30 - (decisions.production.automationLevel * 2);
  const cogs = unitSales * productionCostPerUnit;
  const marketingCosts = decisions.marketing.advertising + decisions.marketing.celebrityEndorsement;
  const trainingCosts = decisions.production.workforceTraining;
  const interestExpense = currentStats.totalDebt * 0.05;
  
  const totalExpenses = cogs + marketingCosts + trainingCosts + interestExpense;
  const netProfit = revenue - totalExpenses;
  
  // New Stats
  const newEps = netProfit / 10000000; // Assuming 10m shares
  const newRoe = (netProfit / (currentStats.cash + currentStats.totalDebt)) * 100;
  const newStockPrice = Math.max(5, currentStats.stockPrice * (1 + (newEps / 5) + (newRoe / 100) - 0.2));
  
  const newStats: CompanyStats = {
    ...currentStats,
    revenue,
    netProfit,
    eps: newEps,
    roe: newRoe,
    stockPrice: newStockPrice,
    cash: currentStats.cash + netProfit - decisions.finance.dividendPayout * 1000000 + decisions.finance.loanRequest - decisions.finance.stockBuyback,
    totalDebt: currentStats.totalDebt + decisions.finance.loanRequest,
    marketShare: (unitSales / 50000000) * 100, // Assuming 50m market size
  };

  const nextYear = state.currentYear + 1;
  const newTurnResult = {
    year: nextYear,
    stats: newStats,
    decisions: { ...decisions }
  };

  return {
    ...state,
    currentYear: nextYear,
    history: [...state.history, newTurnResult],
  };
}
