import React from 'react';
import { GlassCard } from '../../../components/ui/GlassCard';

export const MedicalResponse: React.FC = () => {
  return (
    <GlassCard className="p-6">
       <h3 className="font-display text-xl font-bold tracking-widest uppercase text-white mb-6 flex items-center gap-2">
         <span className="material-symbols-outlined text-blue-400">medical_services</span>
         Medical Response
       </h3>
       <div className="space-y-4">
         <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-secondary">Team Alpha</span>
            <span className="text-white font-mono">Sector 112 (Dispatched)</span>
         </div>
         <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-secondary">Team Bravo</span>
            <span className="text-green-400 font-mono">Standby (Base)</span>
         </div>
         <div className="flex justify-between items-center pb-2">
            <span className="text-secondary">First Aid Stock</span>
            <span className="text-white font-mono">94% Capacity</span>
         </div>
       </div>
    </GlassCard>
  );
};
