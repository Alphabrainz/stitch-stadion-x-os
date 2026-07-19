import React from 'react';
import { GlassCard } from '../../../components/ui/GlassCard';

export const OpsMetrics: React.FC = () => {
  return (
    <>
      <GlassCard className="p-6 md:col-span-1 space-y-6">
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-1">Avg Entry Time</p>
          <p className="font-bold text-3xl text-green-400">2m 14s</p>
          <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-green-500 h-full w-[90%] rounded-full shadow-[0_0_10px_#22c55e]"></div>
          </div>
          <p className="text-[10px] text-green-400 mt-1 uppercase tracking-wider">Optimal</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-1">Avg Resolution Time</p>
          <p className="font-bold text-3xl text-white">4m 30s</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-1">Stadium Health Score</p>
          <p className="font-bold text-xl text-primary">98.5%</p>
        </div>
        <div>
          <p className="text-secondary text-xs uppercase tracking-widest mb-1">Active Incidents</p>
          <p className="font-bold text-3xl text-brand-red animate-pulse">3</p>
        </div>
      </GlassCard>

      <GlassCard className="p-0 md:col-span-3 aspect-[2/1] relative overflow-hidden border-primary/20">
        <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-8">
           <div className="w-full h-full border-2 border-white/10 rounded-[100px] relative">
              <div className="absolute inset-8 border border-white/5 rounded-[80px]"></div>
              <div className="absolute inset-[80px] bg-green-900/20 border border-green-500/20 rounded-[60px] flex items-center justify-center">
                  <span className="text-green-500/50 uppercase tracking-widest font-bold">Pitch</span>
              </div>
              <div className="absolute top-12 left-1/4 w-32 h-16 bg-red-500/40 blur-xl rounded-full mix-blend-screen animate-pulse"></div>
              <div className="absolute bottom-12 right-1/4 w-48 h-24 bg-yellow-500/40 blur-xl rounded-full mix-blend-screen"></div>
              <div className="absolute top-16 left-[30%]">
                <span className="material-symbols-outlined text-brand-red shadow-[0_0_15px_#FF0000]">warning</span>
              </div>
           </div>
        </div>
      </GlassCard>
    </>
  );
};
