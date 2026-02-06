import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Settings, 
  DollarSign, 
  Factory, 
  ShoppingCart, 
  RefreshCcw,
  LayoutDashboard,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_GAME_STATE, simulateTurn } from './data/simulation';
import { GameState, Decisions } from './types';
import { Dashboard } from './components/Dashboard';
import { MarketingDecisions } from './components/MarketingDecisions';
import { ProductDecisions } from './components/ProductDecisions';
import { ProductionDecisions } from './components/ProductionDecisions';
import { FinanceDecisions } from './components/FinanceDecisions';
import { Reports } from './components/Reports';
import { CSRDecisions } from './components/CSRDecisions';

export function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'marketing' | 'product' | 'production' | 'finance' | 'csr' | 'reports'>('dashboard');

  const updateDecisions = (updates: Partial<Decisions>) => {
    setGameState(prev => ({
      ...prev,
      currentDecisions: {
        ...prev.currentDecisions,
        ...updates
      }
    }));
  };

  const handleNextTurn = () => {
    const newState = simulateTurn(gameState);
    setGameState(newState);
    setActiveTab('dashboard');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marketing', label: 'Marketing', icon: ShoppingCart },
    { id: 'product', label: 'Product Design', icon: Settings },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'csr', label: 'CSR & Ethics', icon: Heart },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const latestStats = gameState.history[gameState.history.length - 1].stats;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="font-black text-lg leading-tight tracking-tight">STRATEGY</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Master Sim</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800">
          <button 
            onClick={handleNextTurn}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            <RefreshCcw size={18} />
            End Turn {gameState.currentYear}
          </button>
          <p className="text-[10px] text-center text-slate-500 mt-4 uppercase font-bold tracking-widest">
            Year {gameState.currentYear} in Progress
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{gameState.companyName}</h2>
            <p className="text-xs text-slate-500 font-medium">Global Strategy Management Simulation</p>
          </div>
          
          <div className="flex gap-6">
            <StatHeader label="Stock Price" value={`$${latestStats.stockPrice.toFixed(2)}`} />
            <StatHeader label="Market Share" value={`${latestStats.overallMarketShare.toFixed(1)}%`} />
            <StatHeader label="Cash" value={`$${(latestStats.cash / 1000000).toFixed(1)}M`} />
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <Dashboard gameState={gameState} />}
              {activeTab === 'marketing' && (
                <MarketingDecisions 
                  decisions={gameState.currentDecisions.marketing} 
                  celebrityEndorsement={gameState.currentDecisions.celebrityEndorsement}
                  onMarketingChange={(m) => updateDecisions({ marketing: m })} 
                  onCelebrityChange={(val) => updateDecisions({ celebrityEndorsement: val })}
                />
              )}
              {activeTab === 'product' && (
                <ProductDecisions 
                  decisions={gameState.currentDecisions.product} 
                  onChange={(p: Decisions['product']) => updateDecisions({ product: p })} 
                />
              )}
              {activeTab === 'production' && (
                <ProductionDecisions 
                  decisions={gameState.currentDecisions.production} 
                  onChange={(p: Decisions['production']) => updateDecisions({ production: p })} 
                />
              )}
              {activeTab === 'finance' && (
                <FinanceDecisions 
                  decisions={gameState.currentDecisions.finance} 
                  onChange={(f: Decisions['finance']) => updateDecisions({ finance: f })} 
                />
              )}
              {activeTab === 'csr' && (
                <CSRDecisions 
                  decisions={gameState.currentDecisions.csr} 
                  onChange={(c: Decisions['csr']) => updateDecisions({ csr: c })} 
                />
              )}
              {activeTab === 'reports' && <Reports history={gameState.history} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function StatHeader({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-right">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{label}</p>
      <p className="text-lg font-black text-slate-800 leading-tight">{value}</p>
    </div>
  );
}
