import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { GameState } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Activity, Award, Star, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  gameState: GameState;
}

export const Dashboard: React.FC<DashboardProps> = ({ gameState }) => {
  const latestStats = gameState.history[gameState.history.length - 1].stats;
  const previousStats = gameState.history.length > 1 
    ? gameState.history[gameState.history.length - 2].stats 
    : latestStats;

  const chartData = gameState.history.map(turn => ({
    year: `Y${turn.year}`,
    revenue: turn.stats.totalRevenue / 1000000,
    profit: turn.stats.netProfit / 1000000,
    stock: turn.stats.stockPrice,
  }));

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return { icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' };
    if (current < previous) return { icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' };
    return { icon: Activity, color: 'text-slate-400', bg: 'bg-slate-50' };
  };

  const revenueTrend = getTrend(latestStats.totalRevenue, previousStats.totalRevenue);
  const profitTrend = getTrend(latestStats.netProfit, previousStats.netProfit);
  const stockTrend = getTrend(latestStats.stockPrice, previousStats.stockPrice);

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={`$${(latestStats.totalRevenue / 1000000).toFixed(1)}M`} 
          trend={revenueTrend} 
          subtext="Global company sales"
        />
        <StatCard 
          label="Net Profit" 
          value={`$${(latestStats.netProfit / 1000000).toFixed(1)}M`} 
          trend={profitTrend} 
          subtext="After-tax earnings"
        />
        <StatCard 
          label="Earnings Per Share" 
          value={`$${latestStats.eps.toFixed(2)}`} 
          icon={DollarSign} 
          subtext={`Trend: ${stockTrend.icon === TrendingUp ? 'Bullish' : 'Bearish'}`}
        />
        <StatCard 
          label="Image Rating" 
          value={latestStats.imageRating.toFixed(0)} 
          icon={Star} 
          subtext="Brand reputation"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="text-indigo-500" size={20} />
              Performance Over Time
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($M)" />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={0} name="Profit ($M)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-indigo-500" size={20} />
              Stock Price History
            </h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="stock" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} name="Stock Price ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar / Company Health */}
        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <Trophy className="text-amber-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Company Health</h3>
              <p className="text-indigo-200 text-sm mb-6">Your overall performance score is based on five key metrics.</p>
              
              <div className="space-y-4">
                <HealthMetric label="Return on Equity" value={`${latestStats.roe.toFixed(1)}%`} progress={latestStats.roe * 4} />
                <HealthMetric label="Credit Rating" value={latestStats.creditRating} progress={85} />
                <HealthMetric label="Market Share" value={`${latestStats.overallMarketShare.toFixed(1)}%`} progress={latestStats.overallMarketShare * 3} />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="text-indigo-500" size={18} />
              Strategic Tips
            </h4>
            <div className="space-y-3">
              <p className="text-xs text-slate-500 border-l-2 border-indigo-200 pl-3 italic">
                "Increasing your advertising spend can boost demand but watch your margins."
              </p>
              <p className="text-xs text-slate-500 border-l-2 border-indigo-200 pl-3 italic">
                "Workforce training improves productivity and reduces production costs over time."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function StatCard({ label, value, trend, icon: Icon, subtext }: { label: string, value: string, trend?: any, icon?: any, subtext: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        {trend && (
          <div className={`p-2 rounded-lg ${trend.bg}`}>
            <trend.icon size={18} className={trend.color} />
          </div>
        )}
        {Icon && (
          <div className="p-2 rounded-lg bg-indigo-50">
            <Icon size={18} className="text-indigo-500" />
          </div>
        )}
      </div>
      <h4 className="text-3xl font-black text-slate-800 mb-1">{value}</h4>
      <p className="text-xs text-slate-500 font-medium">{subtext}</p>
    </div>
  );
}

function HealthMetric({ label, value, progress }: { label: string, value: string, progress: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-indigo-300">{label}</span>
        <span className="font-bold">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-indigo-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, progress)}%` }}
          className="h-full bg-emerald-400"
        />
      </div>
    </div>
  );
}
