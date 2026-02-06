import React, { useState } from 'react';
import { Decisions, Region, RegionalDecisions } from '../types';
import { ShoppingCart, HelpCircle, Globe, Award } from 'lucide-react';

interface MarketingDecisionsProps {
  decisions: Decisions['marketing'];
  celebrityEndorsement: number;
  onMarketingChange: (updates: Decisions['marketing']) => void;
  onCelebrityChange: (val: number) => void;
}

export const MarketingDecisions: React.FC<MarketingDecisionsProps> = ({ 
  decisions, 
  celebrityEndorsement,
  onMarketingChange,
  onCelebrityChange
}) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>('North America');
  const regions: Region[] = ['North America', 'Europe-Africa', 'Asia-Pacific', 'Latin America'];

  const handleRegionalUpdate = (updates: Partial<RegionalDecisions>) => {
    onMarketingChange({
      ...decisions,
      [selectedRegion]: {
        ...decisions[selectedRegion],
        ...updates
      }
    });
  };

  const regDec = decisions[selectedRegion];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <ShoppingCart className="text-indigo-500" size={28} />
            Marketing Strategy
          </h2>
          <p className="text-slate-500">Determine regional pricing and global brand investments.</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setSelectedRegion(r)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              selectedRegion === r 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <Globe size={20} />
            <h3 className="font-bold">{selectedRegion} Decisions</h3>
          </div>
          
          <DecisionSlider 
            label="Wholesale Price" 
            value={regDec.price} 
            min={30} 
            max={150} 
            unit="$"
            description="The price you charge retailers in this region."
            onChange={(val) => handleRegionalUpdate({ price: val })} 
          />
          
          <DecisionSlider 
            label="Advertising Budget" 
            value={regDec.advertising} 
            min={0} 
            max={5000000} 
            step={50000}
            isCurrency
            description="Spend on regional media and promotions."
            onChange={(val) => handleRegionalUpdate({ advertising: val })} 
          />

          <hr className="border-slate-100" />

          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <Award size={20} />
            <h3 className="font-bold">Global Brand Decisions</h3>
          </div>

          <DecisionSlider 
            label="Celebrity Endorsement" 
            value={celebrityEndorsement} 
            min={0} 
            max={5000000} 
            step={100000}
            isCurrency
            description="Global budget for celebrity contracts (affects all regions)."
            onChange={onCelebrityChange} 
          />
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="text-indigo-400" size={18} />
              Regional Intelligence
            </h3>
            <div className="space-y-4 text-sm text-slate-400">
              <p>
                Each region has unique price sensitivities. <span className="text-white font-bold">Asia-Pacific</span> is currently showing the highest growth potential.
              </p>
              <p>
                Celebrity endorsements provide a brand lift across all markets, helping justify higher prices.
              </p>
            </div>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl">
            <h4 className="font-bold text-indigo-900 mb-2">Regional Demand Index</h4>
            <div className="h-2 w-full bg-indigo-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500" 
                style={{ width: `${Math.min(100, (65 - regDec.price + (regDec.advertising / 100000)) * 2)}%` }}
              />
            </div>
            <p className="text-[10px] text-indigo-500 mt-2 uppercase font-bold tracking-widest text-center">Relative to average regional performance</p>
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
