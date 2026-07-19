import React from 'react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { useStadionStore } from '../../../store/useStadionStore';

export const LockdownProtocol: React.FC = () => {
  const { lockdownMode, setLockdownMode } = useStadionStore();
  return (
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
  );
};
