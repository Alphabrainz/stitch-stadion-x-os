import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';

export const ArcMissionControl: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Alert Section */}
      <div className="md:col-span-2">
        <GlassCard className="h-full border-brand-red/30 bg-black/40">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-brand-red text-3xl">psychology</span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-widest uppercase">ARC Mission Control</h2>
              <p className="text-xs text-brand-red font-mono">Live Operations AI</p>
            </div>
          </div>
          
          <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <span className="text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Critical Insight</span>
              <h3 className="text-3xl font-light text-white tracking-tight">
                North Gate crowd <span className="font-bold text-brand-red">85%</span>
              </h3>
              
              <div className="mt-6 border-l-2 border-brand-red pl-4 py-1">
                <span className="text-xs text-white/50 uppercase tracking-[0.2em] font-semibold block mb-1">Recommendation</span>
                <p className="text-xl text-white font-medium">Open Gate 6 immediately to disperse queue.</p>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs text-white/70 font-mono">Confidence: 96%</span>
                </div>
                
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white/5 text-white/70 text-sm font-medium rounded hover:bg-white/10 transition">
                    Dismiss
                  </button>
                  <button className="px-4 py-2 bg-brand-red text-black text-sm font-bold rounded hover:bg-brand-red/80 transition flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">done</span>
                    Execute Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Secondary Recommendations */}
      <div className="flex flex-col gap-6">
        <GlassCard className="border-primary/20 bg-black/40">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-xl">bolt</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Directives</h3>
          </div>
          
          <div className="flex flex-col gap-4">
             <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <h4 className="text-white text-sm font-medium">Restock Sector 204 Food Stand</h4>
                <p className="text-white/50 text-xs mt-1">Inventory running low based on current sales velocity.</p>
                <div className="mt-3 flex justify-end">
                  <button className="text-primary text-xs font-bold uppercase tracking-wider hover:text-white transition">Approve</button>
                </div>
             </div>
             <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <h4 className="text-white text-sm font-medium">Adjust AC Zone C</h4>
                <p className="text-white/50 text-xs mt-1">Temperature anomalies detected. Recommend -2°C adjustment.</p>
                <div className="mt-3 flex justify-end">
                  <button className="text-primary text-xs font-bold uppercase tracking-wider hover:text-white transition">Approve</button>
                </div>
             </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
