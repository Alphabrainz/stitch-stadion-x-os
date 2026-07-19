import React from 'react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Badge } from '../../../components/ui/Badge';

export const SecurityAuditLog: React.FC = () => {
  return (
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
  );
};
