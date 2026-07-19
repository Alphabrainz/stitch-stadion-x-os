import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { useStadionStore } from '../../store/useStadionStore';

export const IncidentFeeds: React.FC = () => {
  const { incidents, resolveIncident, addNotification } = useStadionStore();
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="font-display text-3xl font-black uppercase tracking-widest text-white mb-2">Incident Feeds</h2>
          <p className="text-secondary">Live tracking of all stadium irregularities.</p>
        </div>
        <button className="bg-brand-red text-white font-bold tracking-widest uppercase py-3 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> Create Incident
        </button>
      </div>
      
      <GlassCard className="p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-secondary uppercase tracking-widest text-[11px]">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Location</th>
              <th className="p-4">Time</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {incidents.map(inc => (
              <tr key={inc.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4 font-mono text-primary">{inc.id}</td>
                <td className="p-4 font-bold text-white">{inc.type}</td>
                <td className="p-4 text-secondary">{inc.location}</td>
                <td className="p-4 text-secondary font-mono">{inc.time}</td>
                <td className="p-4">
                  <Badge variant={inc.priority === 'Critical' ? 'danger' : inc.priority === 'High' ? 'warning' : 'info'}>
                    {inc.priority}
                  </Badge>
                </td>
                <td className="p-4">
                  <span className={`flex items-center gap-2 ${inc.status === 'Resolved' ? 'text-green-500' : 'text-white'}`}>
                     {inc.status === 'Resolved' && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
                     {inc.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {inc.status !== 'Resolved' && (
                    <button 
                      onClick={() => {
                        resolveIncident(inc.id);
                        addNotification(`Incident ${inc.id} (${inc.type}) has been resolved by Security Team Alpha.`, 'success');
                      }}
                      className="text-green-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 uppercase tracking-widest text-[10px] font-bold border border-green-500/30 hover:bg-green-500 px-3 py-1 rounded"
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

    </div>
  );
};
