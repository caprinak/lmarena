import React from 'react';
import { Decisions } from '../types';
import { Factory, Zap, Users } from 'lucide-react';

interface ProductionDecisionsProps {
  decisions: Decisions['production'];
  onChange: (updates: Decisions['production']) => void;
}

export const ProductionDecisions: React.FC<ProductionDecisionsProps> = ({ decisions, onChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Factory className="text-indigo-500" size={28} />
          Production & Facilities
        </h2>
        <p className="text-slate-500">Manage your manufacturing capacity, automation, and workforce.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Zap className="text-amber-500" size={16} />
                  Automation Level
                </h4>
                <p className="text-xs text-slate-500">Invest in robotics to reduce per-unit labor costs.</p>
              </div>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                Level {decisions.automationLevel}
              </span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onChange({ ...decisions, automationLevel: lvl })}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    decisions.automationLevel === lvl 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Users className="text-blue-500" size={16} />
                  Training Budget
                </h4>
                <p className="text-xs text-slate-500">Investment in workforce skill development.</p>
              </div>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                ${(decisions.workforceTraining / 1000000).toFixed(1)}M
              </span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={5000000} 
              step={100000}
              value={decisions.workforceTraining} 
              onChange={(e) => onChange({ ...decisions, workforceTraining: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800">Capacity Expansion</h4>
                <p className="text-xs text-slate-500">Purchase new production equipment (units/year).</p>
              </div>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                +{decisions.capacityExpansion.toLocaleString()} Units
              </span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={2000000} 
              step={100000}
              value={decisions.capacityExpansion} 
              onChange={(e) => onChange({ ...decisions, capacityExpansion: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold mb-4">Operations Brief</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <span className="text-slate-400 text-sm">Investment Required</span>
                <span className="font-bold text-amber-400">
                  ${((decisions.automationLevel * 2000000) + (decisions.capacityExpansion * 50)).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">
                Automation reduces labor costs but requires significant upfront capital. 
                Training reduces reject rates and increases productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
