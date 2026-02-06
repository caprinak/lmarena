import React from 'react';
import { TurnResult } from '../types';
import { BarChart3, ChevronRight } from 'lucide-react';

interface ReportsProps {
  history: TurnResult[];
}

export const Reports: React.FC<ReportsProps> = ({ history }) => {
  const latestResult = history[history.length - 1];

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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Year {latestResult.year} vs Year {latestResult.year - 1}</span>
        </div>
        <div className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <th className="text-left pb-4">Line Item</th>
                <th className="text-right pb-4">Amount ($)</th>
                <th className="text-right pb-4">% of Rev</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <ReportRow label="Net Revenue" value={latestResult.stats.revenue} percentage={100} indent={0} bold />
              <ReportRow label="Cost of Goods Sold" value={latestResult.stats.revenue * 0.6} percentage={60} indent={4} />
              <ReportRow label="Gross Profit" value={latestResult.stats.revenue * 0.4} percentage={40} indent={0} bold />
              <ReportRow label="Marketing Expense" value={latestResult.decisions.marketing.advertising} percentage={(latestResult.decisions.marketing.advertising / latestResult.stats.revenue) * 100} indent={4} />
              <ReportRow label="Workforce Training" value={latestResult.decisions.production.workforceTraining} percentage={(latestResult.decisions.production.workforceTraining / latestResult.stats.revenue) * 100} indent={4} />
              <ReportRow label="Net Profit" value={latestResult.stats.netProfit} percentage={(latestResult.stats.netProfit / latestResult.stats.revenue) * 100} indent={0} bold highlight />
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex justify-between items-center">
            Operating Statistics
            <ChevronRight className="text-slate-300" size={16} />
          </h3>
          <div className="space-y-4">
            <StatRow label="Units Sold" value={(latestResult.stats.revenue / latestResult.decisions.marketing.price).toLocaleString()} />
            <StatRow label="Avg. Selling Price" value={`$${latestResult.decisions.marketing.price.toFixed(2)}`} />
            <StatRow label="Profit Margin" value={`${((latestResult.stats.netProfit / latestResult.stats.revenue) * 100).toFixed(1)}%`} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex justify-between items-center">
            Balance Sheet Highlights
            <ChevronRight className="text-slate-300" size={16} />
          </h3>
          <div className="space-y-4">
            <StatRow label="Ending Cash" value={`$${latestResult.stats.cash.toLocaleString()}`} />
            <StatRow label="Total Debt" value={`$${latestResult.stats.totalDebt.toLocaleString()}`} />
            <StatRow label="Current Ratio" value={(latestResult.stats.cash / 20000000).toFixed(2)} />
          </div>
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
