import React from 'react';
import { GlassCard } from '../../../components/ui/GlassCard';

export const RecentAlerts: React.FC = () => {
  return (
    <GlassCard className="p-6">
      <h3 className="font-display text-xl font-bold tracking-widest uppercase text-white mb-6">Recent ARC Alerts</h3>
      <div className="space-y-4">
        <div className="bg-brand-red/10 border border-brand-red/20 p-4 rounded-xl flex items-center gap-4">
          <span className="material-symbols-outlined text-brand-red">warning</span>
          <div>
            <p className="font-bold text-white text-sm">High Congestion Detected at Gate B4</p>
            <p className="text-secondary text-xs">2 mins ago • ARC recommends rerouting traffic to Gate B5.</p>
          </div>
          <button className="ml-auto bg-brand-red text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-red/80 transition-colors uppercase">Reroute</button>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-4">
          <span className="material-symbols-outlined text-yellow-500">sensors</span>
          <div>
            <p className="font-bold text-white text-sm">Temperature Sensor Calibration Issue (Sector 2)</p>
            <p className="text-secondary text-xs">15 mins ago • Maintenance notified.</p>
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          <div>
            <p className="font-bold text-white text-sm">Medical Team Alpha reached Sector 4</p>
            <p className="text-secondary text-xs">22 mins ago • Situation resolved.</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
