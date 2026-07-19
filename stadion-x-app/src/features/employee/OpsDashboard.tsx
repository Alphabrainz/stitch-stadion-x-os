import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { useStadionStore } from '../../store/useStadionStore';
import { ArcMissionControl } from '../ai/ArcMissionControl';
import { SecurityAuditLog } from './components/SecurityAuditLog';
import { GateManagement } from './components/GateManagement';
import { MedicalResponse } from './components/MedicalResponse';
import { TournamentManagement } from './components/TournamentManagement';
import { LockdownProtocol } from './components/LockdownProtocol';
import { OpsMetrics } from './components/OpsMetrics';
import { RecentAlerts } from './components/RecentAlerts';
export const OpsDashboard: React.FC = () => {
  const { lockdownMode } = useStadionStore();
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-4xl font-black uppercase tracking-widest text-brand-red mb-2 text-glow">Mission Control</h2>
          <p className="text-secondary text-lg">System operations nominal.</p>
        </div>
        <div className="flex gap-4">
          {lockdownMode && (
            <Badge variant="danger" className="text-sm px-4 shadow-[0_0_20px_rgba(255,0,0,0.8)] animate-pulse">LOCKDOWN ACTIVE</Badge>
          )}
          <Badge variant="live" className="text-sm px-4">Live Status: Alpha</Badge>
        </div>
      </div>
      
      {/* ARC Mission Control AI Layer */}
      <ArcMissionControl />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <OpsMetrics />
      </div>
      
      <TournamentManagement />
      <LockdownProtocol />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <GateManagement />
        <MedicalResponse />
      </div>
      
      <RecentAlerts />
      <SecurityAuditLog />

    </div>
  );
};
