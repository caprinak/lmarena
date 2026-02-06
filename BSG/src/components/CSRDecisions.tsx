import React from 'react';
import { Decisions } from '../types';
import { Leaf, Heart, ShieldCheck } from 'lucide-react';

interface CSRDecisionsProps {
  decisions: Decisions['csr'];
  onChange: (updates: Decisions['csr']) => void;
}

export const CSRDecisions: React.FC<CSRDecisionsProps> = ({ decisions, onChange }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <Heart className="text-rose-500" size={28} />
          Corporate Social Responsibility
        </h2>
        <p className="text-slate-500">Invest in your company's social and environmental impact.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-10">
          <CSRSlider 
            label="Community Support" 
            icon={<Heart className="text-rose-500" size={18} />}
            value={decisions.communitySupport} 
            max={2000000} 
            description="Grants and volunteer programs in local communities."
            onChange={(val) => onChange({ ...decisions, communitySupport: val })} 
          />
          
          <CSRSlider 
            label="Green Initiatives" 
            icon={<Leaf className="text-emerald-500" size={18} />}
            value={decisions.greenInitiatives} 
            max={2000000} 
            description="Investments in sustainable manufacturing and materials."
            onChange={(val) => onChange({ ...decisions, greenInitiatives: val })} 
          />

          <CSRSlider 
            label="Ethics Training" 
            icon={<ShieldCheck className="text-indigo-500" size={18} />}
            value={decisions.ethicsTraining} 
            max={1000000} 
            description="Programs to ensure fair labor and ethical standards."
            onChange={(val) => onChange({ ...decisions, ethicsTraining: val })} 
          />
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-lg font-bold mb-6">Strategic Impact</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl h-fit">
                <Leaf className="text-emerald-400" size={24} />
              </div>
              <div>
                <h4 className="font-bold">Image Rating Boost</h4>
                <p className="text-sm text-slate-400">CSR investments significantly improve your brand's reputation with consumers.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="p-3 bg-rose-500/20 rounded-xl h-fit">
                <Heart className="text-rose-400" size={24} />
              </div>
              <div>
                <h4 className="font-bold">Workforce Productivity</h4>
                <p className="text-sm text-slate-400">Ethical standards and community pride lead to higher employee morale and lower turnover.</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-xs text-slate-400 italic">
                "Consumers are increasingly willing to pay a premium for brands that align with their values."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CSRSlider({ label, icon, value, max, description, onChange }: { 
  label: string, icon: React.ReactNode, value: number, max: number, description: string, onChange: (val: number) => void 
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-bold text-slate-800 flex items-center gap-2">
            {icon}
            {label}
          </h4>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
          ${(value / 1000).toFixed(0)}K
        </span>
      </div>
      <input 
        type="range" 
        min={0} 
        max={max} 
        step={50000}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
}
