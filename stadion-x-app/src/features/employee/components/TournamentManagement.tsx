import React from 'react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { useStadionStore } from '../../../store/useStadionStore';

export const TournamentManagement: React.FC = () => {
  const { updateTeamPoints } = useStadionStore();
  return (
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
  );
};
