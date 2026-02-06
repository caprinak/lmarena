import React from 'react';
import { Decisions } from '../types';
import { Settings, Sparkles } from 'lucide-react';

interface ProductDecisionsProps {
  decisions: Decisions['product'];
  onChange: (updates: Decisions['product']) => void;
}

export const ProductDecisions: React.FC<ProductDecisionsProps> = ({ decisions, onChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Settings className="text-indigo-500" size={28} />
          Product Design
        </h2>
        <p className="text-slate-500">Engineer the specifications and quality standards of your footwear line.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800">S/Q Rating (Quality)</h4>
                <p className="text-xs text-slate-500">Style and Quality rating of the materials used.</p>
              </div>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                {decisions.quality} / 100
              </span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={100} 
              value={decisions.quality} 
              onChange={(e) => onChange({ ...decisions, quality: Number(e.target.value) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>ECONOMY</span>
              <span>LUXURY</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-slate-800">Number of Models</h4>
                <p className="text-xs text-slate-500">The variety of models offered in your catalog.</p>
              </div>
              <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                {decisions.features} Models
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => onChange({ ...decisions, features: num })}
                  className={`py-3 rounded-xl font-bold transition-all ${
                    decisions.features === num 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <Sparkles className="text-emerald-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-4">Design Impact</h3>
            <p className="text-emerald-200 text-sm mb-6">
              Higher quality ratings (S/Q) allow for premium pricing but increase your COGS (Cost of Goods Sold). 
              A wider selection of models appeals to more consumer segments but complicates production, increasing setup costs.
            </p>
            
            <div className="p-4 bg-emerald-800/50 rounded-2xl border border-emerald-700/50">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Cost Projection</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm">Production Cost / Unit</span>
                <span className="text-lg font-black">${(20 + (decisions.quality * 0.2) + (decisions.features * 0.5)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
