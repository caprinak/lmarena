import React from 'react';
import { Decisions } from '../types';
import { ShoppingCart, HelpCircle } from 'lucide-react';

interface MarketingDecisionsProps {
  decisions: Decisions['marketing'];
  onChange: (updates: Decisions['marketing']) => void;
}

export const MarketingDecisions: React.FC<MarketingDecisionsProps> = ({ decisions, onChange }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShoppingCart className="text-indigo-500" size={28} />
            Marketing Strategy
          </h2>
          <p className="text-slate-500">Determine pricing and promotional spend for the North American market.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <DecisionSlider 
            label="Wholesale Price" 
            value={decisions.price} 
            min={30} 
            max={150} 
            unit="$"
            description="The price you charge retailers per pair of shoes."
            onChange={(val) => onChange({ ...decisions, price: val })} 
          />
          
          <DecisionSlider 
            label="Advertising Budget" 
            value={decisions.advertising} 
            min={0} 
            max={10000000} 
            step={100000}
            isCurrency
            description="Total spend on TV, Print, and Digital advertising."
            onChange={(val) => onChange({ ...decisions, advertising: val })} 
          />

          <DecisionSlider 
            label="Celebrity Endorsement" 
            value={decisions.celebrityEndorsement} 
            min={0} 
            max={5000000} 
            step={100000}
            isCurrency
            description="Fee paid for global brand ambassador program."
            onChange={(val) => onChange({ ...decisions, celebrityEndorsement: val })} 
          />
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="text-indigo-400" size={18} />
              Market Context
            </h3>
            <div className="space-y-4 text-sm text-slate-400">
              <p>
                The average wholesale price in the industry is <span className="text-white font-bold">$55.00</span>. 
                Prices significantly above this will require higher Quality ratings to maintain volume.
              </p>
              <p>
                Advertising has diminishing returns. The first $2M is highly effective, while spend above $8M has marginal impact on market share.
              </p>
            </div>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl">
            <h4 className="font-bold text-indigo-900 mb-2">Estimated Demand Impact</h4>
            <div className="h-2 w-full bg-indigo-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500" 
                style={{ width: `${Math.min(100, (60 - decisions.price + (decisions.advertising / 200000)) * 2)}%` }}
              />
            </div>
            <p className="text-[10px] text-indigo-500 mt-2 uppercase font-bold tracking-widest">Calculated based on current price/promo mix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  isCurrency?: boolean;
  description: string;
  onChange: (val: number) => void;
}

function DecisionSlider({ label, value, min, max, step = 1, unit = "", isCurrency = false, description, onChange }: SliderProps) {
  const formatValue = (val: number) => {
    if (isCurrency) {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
      return `$${val}`;
    }
    return `${unit}${val}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-bold text-slate-800">{label}</h4>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
          {formatValue(value)}
        </span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
