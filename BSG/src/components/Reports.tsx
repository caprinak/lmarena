import React from 'react';
import { TurnResult } from '../types';
import { BarChart3, ChevronRight } from 'lucide-react';

interface ReportsProps {
  history: TurnResult[];
}

export const Reports: React.FC<ReportsProps> = ({ history }) => {
  const latestResult = history[history.length - 1];
  const { totalRevenue, netProfit, cash, totalDebt } = latestResult.stats;

  const marketingTotal = Object.values(latestResult.decisions.marketing).reduce((acc, curr) => acc + curr.advertising, 0) + latestResult.decisions.celebrityEndorsement;
  const csrTotal = latestResult.decisions.csr.communitySupport + latestResult.decisions.csr.greenInitiatives + latestResult.decisions.csr.ethicsTraining;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <BarChart3 className="text-indigo-500" size={28} />
          Financial Statements
        </h2>
        <p className="text-slate-500">Year {latestResult.year} Performance Summary.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Income Statement</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Year {latestResult.year}</span>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <th className="text-left pb-4">Line Item</th>
                <th className="text-right pb-4">Amount ($)</th>
                <th className="text-right pb-4">% of Rev</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <ReportRow label="Total Net Revenue" value={totalRevenue} percentage={100} indent={0} bold />
              <ReportRow label="Cost of Goods Sold" value={totalRevenue * 0.55} percentage={55} indent={4} />
              <ReportRow label="Gross Profit" value={totalRevenue * 0.45} percentage={45} indent={0} bold />
              <ReportRow label="Marketing & Brand" value={marketingTotal} percentage={(marketingTotal / totalRevenue) * 100} indent={4} />
              <ReportRow label="Workforce Training" value={latestResult.decisions.production.workforceTraining} percentage={(latestResult.decisions.production.workforceTraining / totalRevenue) * 100} indent={4} />
              <ReportRow label="CSR & Ethics" value={csrTotal} percentage={(csrTotal / totalRevenue) * 100} indent={4} />
              <ReportRow label="Operating Profit" value={netProfit * 1.2} percentage={(netProfit * 1.2 / totalRevenue) * 100} indent={0} bold />
              <ReportRow label="Net Profit" value={netProfit} percentage={(netProfit / totalRevenue) * 100} indent={0} bold highlight />
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Regional Performance</h3>
          <div className="space-y-4">
            {Object.entries(latestResult.stats.regions).map(([name, stats]) => (
              <div key={name} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="font-bold text-slate-700">{name}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Market Share: {stats.marketShare.toFixed(1)}%</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold">${(stats.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-slate-500">{(stats.unitSales / 1000000).toFixed(2)}M pairs</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="font-bold text-slate-800 p-6 border-b border-slate-50">Competitive Industry Benchmarks</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <th className="text-left px-6 py-3">Company</th>
                  <th className="text-right px-6 py-3">Stock Price</th>
                  <th className="text-right px-6 py-3">Mkt Share</th>
                  <th className="text-right px-6 py-3">Img Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="bg-indigo-50/30">
                  <td className="px-6 py-4 font-bold text-indigo-600">Apex (You)</td>
                  <td className="px-6 py-4 text-right font-mono">${latestResult.stats.stockPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">{latestResult.stats.overallMarketShare.toFixed(1)}%</td>
                  <td className="px-6 py-4 text-right">{latestResult.stats.imageRating.toFixed(0)}</td>
                </tr>
                {latestResult.competitors.sort((a, b) => b.stockPrice - a.stockPrice).map(comp => (
                  <tr key={comp.name}>
                    <td className="px-6 py-4 font-medium text-slate-700">{comp.name}</td>
                    <td className="px-6 py-4 text-right font-mono">${comp.stockPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">{comp.marketShare.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-right">{comp.imageRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex justify-between items-center">
          Balance Sheet Highlights
          <ChevronRight className="text-slate-300" size={16} />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <StatRow label="Ending Cash Balance" value={`$${cash.toLocaleString()}`} />
          <StatRow label="Total Outstanding Debt" value={`$${totalDebt.toLocaleString()}`} />
          <StatRow label="Inventory Value" value="$0" />
          <StatRow label="Debt-to-Equity" value={(totalDebt / (cash + totalDebt)).toFixed(2)} />
        </div>
      </div>
    </div>
  );
};

function ReportRow({ label, value, percentage, indent, bold = false, highlight = false }: { 
  label: string, value: number, percentage: number, indent: number, bold?: boolean, highlight?: boolean 
}) {
  return (
    <tr className={`${highlight ? 'bg-indigo-50/50' : ''}`}>
      <td className={`py-4 ${bold ? 'font-bold text-slate-800' : 'text-slate-600'}`} style={{ paddingLeft: `${indent * 4}px` }}>
        {label}
      </td>
      <td className={`text-right py-4 font-mono ${bold ? 'font-bold' : ''}`}>
        {value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </td>
      <td className="text-right py-4 text-slate-400 font-medium text-xs">
        {percentage.toFixed(1)}%
      </td>
    </tr>
  );
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}
