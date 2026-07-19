import React from 'react';
import { GlassCard } from '../../../components/ui/GlassCard';

export const GateManagement: React.FC = () => {
  return (
    <GlassCard className="p-6">
       <h3 className="font-display text-xl font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
         <span className="material-symbols-outlined text-primary">sensor_door</span>
         Gate Management
       </h3>
       <div className="space-y-4">
         <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-secondary">Gate A (North)</span>
            <span className="text-green-400 font-mono">FLOW: OPTIMAL (420/min)</span>
         </div>
         <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-secondary">Gate B (South)</span>
            <span className="text-yellow-400 font-mono">FLOW: MODERATE (550/min)</span>
         </div>
         <div className="flex justify-between items-center pb-2">
            <span className="text-secondary">Gate C (VIP)</span>
            <span className="text-brand-red font-mono animate-pulse">FLOW: BOTTLENECK</span>
         </div>
       </div>
    </GlassCard>
  );
};
