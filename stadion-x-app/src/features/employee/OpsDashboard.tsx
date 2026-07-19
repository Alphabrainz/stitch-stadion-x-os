import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Badge } from '../../components/ui/Badge';
import { useStadionStore } from '../../store/useStadionStore';
import { ArcMissionControl } from '../ai/ArcMissionControl';

export const OpsDashboard: React.FC = () => {
  const { updateTeamPoints, lockdownMode, setLockdownMode } = useStadionStore();
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
        
        {/* Core Metrics */}
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

        {/* Stadium Diagram / Heatmap */}
        <GlassCard className="p-0 md:col-span-3 aspect-[2/1] relative overflow-hidden border-primary/20">
          <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-8">
             {/* Abstract Stadium Representation */}
             <div className="w-full h-full border-2 border-white/10 rounded-[100px] relative">
                <div className="absolute inset-8 border border-white/5 rounded-[80px]"></div>
                <div className="absolute inset-[80px] bg-green-900/20 border border-green-500/20 rounded-[60px] flex items-center justify-center">
                    <span className="text-green-500/50 uppercase tracking-widest font-bold">Pitch</span>
                </div>
                
                {/* Heatmap Overlays */}
                <div className="absolute top-12 left-1/4 w-32 h-16 bg-red-500/40 blur-xl rounded-full mix-blend-screen animate-pulse"></div>
                <div className="absolute bottom-12 right-1/4 w-48 h-24 bg-yellow-500/40 blur-xl rounded-full mix-blend-screen"></div>
                
                {/* Markers */}
                <div className="absolute top-16 left-[30%]">
                  <span className="material-symbols-outlined text-brand-red shadow-[0_0_15px_#FF0000]">warning</span>
                </div>
             </div>
          </div>
        </GlassCard>

      </div>
      
      {/* Tournament Management */}
      <GlassCard className="p-6">
        <h3 className="font-display text-xl font-bold tracking-widest uppercase text-white mb-6">Tournament Management</h3>
        <p className="text-secondary mb-4 text-sm">Trigger live match events to instantly update the Fan Leaderboards across all devices and sync with Smart Overlays.</p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => updateTeamPoints('IND', true)}
            className="bg-primary text-black font-bold uppercase px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Trigger India Win (+2 Pts)
          </button>
          <button 
            onClick={() => updateTeamPoints('AUS', true)}
            className="bg-primary text-black font-bold uppercase px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Trigger Australia Win (+2 Pts)
          </button>
        </div>
      </GlassCard>

      {/* Global Lockdown Protocol */}
      <GlassCard className="p-6 border-brand-red/30 bg-brand-red/5">
        <h3 className="font-display text-xl font-bold tracking-widest uppercase text-brand-red mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">warning</span>
          Emergency Protocols
        </h3>
        <p className="text-secondary mb-4 text-sm">Triggering Global Lockdown will instantly lock all turnstiles, halt concession orders, and broadcast an emergency takeover screen to ALL Fan devices.</p>
        <button 
          onClick={() => setLockdownMode(!lockdownMode)}
          className={`font-bold uppercase px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)]
            ${lockdownMode 
              ? 'bg-transparent border border-brand-red text-brand-red hover:bg-brand-red/10' 
              : 'bg-brand-red text-white hover:bg-red-600'
            }`}
        >
          {lockdownMode ? 'LIFT LOCKDOWN' : 'INITIATE LOCKDOWN'}
        </button>
      </GlassCard>

      {/* Grid for other Smart Stadium modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
      </div>
      
      {/* Recent Alerts Log */}
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

      {/* Security Audit Log */}
      <GlassCard className="p-6 border-brand-red/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-bold tracking-widest uppercase text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-red">security</span>
            Security Audit Log
          </h3>
          <Badge variant="live" className="text-xs">Active Monitoring</Badge>
        </div>
        <div className="space-y-3 font-mono text-xs overflow-y-auto max-h-60 pr-2">
          
          <div className="flex items-start gap-4 border-b border-white/5 pb-3">
            <span className="text-brand-red whitespace-nowrap pt-0.5">[14:32:41]</span>
            <div>
              <span className="text-white font-bold">BRUTE_FORCE_PREVENTION</span>
              <p className="text-secondary mt-1">3 failed login attempts from IP: 192.168.1.104. Account lock enforced for 30s.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 border-b border-white/5 pb-3">
            <span className="text-yellow-500 whitespace-nowrap pt-0.5">[14:28:12]</span>
            <div>
              <span className="text-white font-bold">RBAC_BOUNDARY_ENFORCED</span>
              <p className="text-secondary mt-1">Fan profile (UID: fan-928) attempted unauthorized access to `/ops`. Redirected safely.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 border-b border-white/5 pb-3">
            <span className="text-green-500 whitespace-nowrap pt-0.5">[14:25:00]</span>
            <div>
              <span className="text-white font-bold">CSP_POLICY_ACTIVE</span>
              <p className="text-secondary mt-1">Content-Security-Policy headers verified. XSS defense nominal.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-b border-white/5 pb-3">
            <span className="text-yellow-500 whitespace-nowrap pt-0.5">[14:15:33]</span>
            <div>
              <span className="text-white font-bold">SESSION_TIMEOUT</span>
              <p className="text-secondary mt-1">Employee UID: ops-44 logged out automatically due to 5m inactivity.</p>
            </div>
          </div>

        </div>
      </GlassCard>

    </div>
  );
};
