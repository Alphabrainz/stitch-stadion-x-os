import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { useToastStore } from '../../store/useToastStore';
import { useStadionStore } from '../../store/useStadionStore';

export const FanDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const [timeLeft, setTimeLeft] = useState(8099); // 02:14:59 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <GlassCard className="p-8 relative overflow-hidden bg-black/80 border-primary/20">
        
        {/* Animated HUD Mesh Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,transparent_calc(100%-2px),rgba(212,175,55,0.1)_calc(100%-2px)),linear-gradient(90deg,transparent_2px,transparent_calc(100%-2px),rgba(212,175,55,0.1)_calc(100%-2px))] bg-[length:40px_40px] animate-[pulse_4s_infinite]"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-[spin_10s_linear_infinite]"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
            <span className="text-primary text-[10px] font-mono tracking-[0.3em] uppercase">System Online</span>
          </div>
          <h2 className="font-display text-4xl font-black uppercase tracking-widest text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Welcome to Stadion X</h2>
          <p className="text-secondary text-lg">Your smart stadium experience awaits.</p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/60 border border-primary/20 p-4 rounded-xl backdrop-blur-md relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-primary/70 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Next Match</p>
              <h4 className="font-bold text-white text-sm tracking-wider">INDIA VS AUSTRALIA 🏏</h4>
              <p className="text-primary text-sm font-mono font-bold mt-2 tracking-widest animate-pulse">Starts in {formatTime(timeLeft)}</p>
            </div>
            
            <div className="bg-black/50 border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-blue-400/30 transition-colors">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-blue-400/10 blur-[20px] rounded-full group-hover:bg-blue-400/20 transition-colors"></div>
              <p className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Weather</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">sunny</span>
                <h4 className="font-bold text-white tracking-widest">24°C / Clear</h4>
              </div>
              <p className="text-xs text-secondary mt-2">Perfect match conditions.</p>
            </div>
            
            <div className="bg-black/50 border border-white/5 p-4 rounded-xl group cursor-pointer hover:border-green-400/30 transition-colors relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-green-400/10 blur-[20px] rounded-full group-hover:bg-green-400/20 transition-colors"></div>
              <p className="text-secondary text-[10px] font-mono uppercase tracking-[0.2em] mb-1">Gate B4 Wait Time</p>
              <h4 className="font-bold text-white flex items-center gap-2 tracking-widest">4 Mins <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></span></h4>
              <p className="text-xs text-green-400 mt-2 font-medium tracking-wide">Flow is optimal.</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
         <span className="w-1 h-6 bg-primary rounded-full"></span>
         <h3 className="font-display text-xl font-bold tracking-widest uppercase text-white">Quick Actions</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 perspective-1000">
        <GlassCard onClick={() => navigate('/fan/tickets')} className="p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] bg-black/40">
          <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all">local_activity</span>
          <span className="font-bold tracking-[0.2em] uppercase text-xs">My Tickets</span>
        </GlassCard>
        
        <GlassCard onClick={() => navigate('/fan/food')} className="p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] bg-black/40">
          <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all">restaurant</span>
          <span className="font-bold tracking-[0.2em] uppercase text-xs">Order Food</span>
        </GlassCard>
        
        <GlassCard onClick={() => navigate('/fan/map')} className="p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] bg-black/40">
          <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all">map</span>
          <span className="font-bold tracking-[0.2em] uppercase text-xs">Navigation Map</span>
        </GlassCard>
        
        <GlassCard 
          onClick={() => {
            const id = useStadionStore.getState().addIncident({
              type: 'Medical',
              location: 'Unknown (Quick Action)',
              priority: 'High'
            });
            addToast(`Emergency Services Alerted! (Incident: ${id})`, 'error');
          }} 
          className="p-6 flex flex-col items-center justify-center gap-4 hover:border-brand-red/50 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,0,0,0.2)] bg-black/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="material-symbols-outlined text-4xl text-brand-red group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] transition-all relative z-10">emergency</span>
          <span className="font-bold tracking-[0.2em] uppercase text-xs text-brand-red relative z-10">SOS Report</span>
        </GlassCard>
      </div>

    </div>
  );
};
