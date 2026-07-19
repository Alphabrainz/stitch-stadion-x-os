import React, { useState } from 'react';
import { emergencyService } from '../../services/emergencyService';
import { useAuthStore } from '../../store/useAuthStore';
import { useStadionStore } from '../../store/useStadionStore';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
  const [status, setStatus] = useState<'idle' | 'dispatching' | 'confirmed'>('idle');
  const [incidentId, setIncidentId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDispatch = async () => {
    setStatus('dispatching');
    try {
      await emergencyService.dispatchSOS(
        user?.uid || 'unknown_user', 
        { lat: 0, lng: 0 } // Mock GPS coordinates for now
      );
      
      const storeId = useStadionStore.getState().addIncident({
        type: 'Security',
        location: 'Fan Reported Location',
        priority: 'Critical'
      });
      
      setIncidentId(storeId);
      setStatus('confirmed');
    } catch (error) {
      console.error("SOS Failed", error);
      setStatus('idle');
    }
  };

  const handleClose = () => {
    setStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] border-2 border-brand-red rounded-3xl p-8 max-w-lg w-full m-4 shadow-[0_0_100px_rgba(255,0,0,0.4)] relative overflow-hidden">
        
        {/* Pulsing red background */}
        <div className="absolute inset-0 bg-brand-red/10 animate-pulse pointer-events-none"></div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-brand-red/20 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[64px] text-brand-red animate-bounce">warning</span>
          </div>
          
          <h2 className="font-display text-3xl font-black text-white uppercase tracking-widest mb-4">
            {status === 'idle' ? 'Declare Emergency?' : status === 'dispatching' ? 'Locating...' : 'Security Dispatched'}
          </h2>
          
          <p className="text-secondary text-lg mb-8">
            {status === 'idle' 
              ? 'Only use this in a real emergency. Security forces will be immediately dispatched to your registered sector.'
              : status === 'dispatching' 
              ? 'Transmitting your GPS coordinates to Mission Control...'
              : `Stay where you are. Response Team Alpha is en route to your location. (Incident ID: ${incidentId})`}
          </p>

          {status === 'idle' && (
            <div className="flex gap-4 w-full">
              <button 
                onClick={handleClose}
                className="flex-1 py-4 rounded-xl border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDispatch}
                className="flex-1 py-4 rounded-xl bg-brand-red text-white font-bold tracking-widest uppercase hover:bg-red-600 shadow-[0_0_30px_rgba(255,0,0,0.5)] transition-colors"
              >
                Confirm SOS
              </button>
            </div>
          )}

          {status === 'confirmed' && (
            <button 
              onClick={handleClose}
              className="w-full py-4 rounded-xl border border-brand-red/50 text-brand-red font-bold tracking-widest uppercase hover:bg-brand-red/10 transition-colors"
            >
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
