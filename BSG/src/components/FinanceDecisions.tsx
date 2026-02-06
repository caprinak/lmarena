import React from 'react';
import { Decisions } from '../types';
import { DollarSign, PieChart, Landmark } from 'lucide-react';

interface FinanceDecisionsProps {
  decisions: Decisions['finance'];
  onChange: (updates: Decisions['finance']) => void;
}

export const FinanceDecisions: React.FC<FinanceDecisionsProps> = ({ decisions, onChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <DollarSign className="text-indigo-500" size={28} />
          Financial Management
        </h2>
        <p className="text-slate-500">Capital structure, shareholder returns, and liquidity planning.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Landmark className="text-slate-600" size={16} />
                  New Loans / (Repayments)
                </h4>
                <p className="text-xs text-slate-500">Request 1-year bank loans at 5.5% interest.</p>
              </div>
              <span className={`text-lg font-black px-3 py-1 rounded-lg ${decisions.loanRequest >= 0 ? 'text-indigo-600 bg-indigo-50' : 'text-red-600 bg-red-50'}`}>
                ${(decisions.loanRequest / 1000000).toFixed(1)}M
              </span>
            </div>
            <input 
              type="range" 
              min={-20000000} 
              max={50000000} 
              step={1000000}
              value={decisions.loanRequest} 
              onChange={(e) => onChange({ ...decisions, loanRequest: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <PieChart className="text-indigo-500" size={16} />
                  Dividend Payout
                </h4>
                <p className="text-xs text-slate-500">Cash returned to shareholders from net profit.</p>
              </div>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                ${decisions.dividendPayout.toFixed(2)} / Share
              </span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={5} 
              step={0.05}
              value={decisions.dividendPayout} 
              onChange={(e) => onChange({ ...decisions, dividendPayout: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800">Stock Buybacks</h4>
                <p className="text-xs text-slate-500">Repurchase outstanding shares to boost EPS.</p>
              </div>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                ${(decisions.stockBuyback / 1000000).toFixed(1)}M
              </span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={25000000} 
              step={1000000}
              value={decisions.stockBuyback} 
              onChange={(e) => onChange({ ...decisions, stockBuyback: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl flex flex-col">
          <h3 className="text-xl font-bold mb-6">Cash Flow Projection</h3>
          <div className="space-y-4 flex-grow">
            <ProjectionRow label="Beginning Cash" value="$50.0M" />
            <ProjectionRow label="Operating Cash Flow" value="+$15.5M" />
            <ProjectionRow label="Financial Decisions" value={`${decisions.loanRequest >= 0 ? '+' : ''}${(decisions.loanRequest / 1000000).toFixed(1)}M`} />
            <div className="pt-4 mt-4 border-t border-indigo-800">
              <ProjectionRow label="Ending Cash Balance" value={`$${(50 + 15.5 + (decisions.loanRequest / 1000000)).toFixed(1)}M`} highlight />
            </div>
          </div>
          <div className="mt-8 p-4 bg-indigo-800/50 rounded-2xl">
            <p className="text-xs text-indigo-200 italic">
              Careful with stock buybacks if your cash balance is low. Overdrawing will trigger an automatic emergency loan at 12% interest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProjectionRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-indigo-300">{label}</span>
      <span className={`font-bold ${highlight ? 'text-emerald-400 text-lg' : 'text-white'}`}>{value}</span>
    </div>
  );
}
