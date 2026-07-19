import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useStadionStore } from '../../store/useStadionStore';

export const AnalyticsView: React.FC = () => {
  const { revenue, incidents } = useStadionStore();
  
  // Simulate live data
  const [occupancy, setOccupancy] = useState(82);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOccupancy(prev => (prev >= 85 ? 81 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 md:px-8 pb-8 pt-4 max-w-[1600px] mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4 gap-4">
        <div>
          <h2 className="font-display text-3xl font-black uppercase tracking-widest text-white drop-shadow-md">Predictive Analytics</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-fast shadow-[0_0_8px_#22c55e]"></span>
            <span className="text-secondary/80 font-mono text-[10px] sm:text-xs uppercase tracking-widest">ARC Core Online • Syncing Live Data</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all">Today</button>
          <button className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-widest transition-all">Match Day</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Occupancy', value: `${occupancy}%`, trend: '+4%', trendUp: true },
          { label: 'Security Alerts', value: incidents.filter(i => i.status !== 'Resolved').length.toString(), trend: incidents.filter(i => i.status !== 'Resolved').length > 0 ? 'Active' : 'Clear', trendUp: false, alert: incidents.filter(i => i.status !== 'Resolved').length > 0 },
          { label: 'Avg Wait Time', value: '4 min', trend: '-1 min', trendUp: true },
          { label: 'Medical', value: incidents.filter(i => i.type === 'Medical').length.toString(), trend: 'Active', trendUp: true },
          { label: 'Revenue', value: `₹${(revenue / 1000).toFixed(1)}k`, trend: '+Live', trendUp: true },
        ].map((kpi, i) => (
          <GlassCard key={i} className={`p-4 flex flex-col justify-between h-full group hover:border-white/20 transition-all ${kpi.alert ? 'border-brand-red/30' : ''}`}>
            <span className="text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2">{kpi.label}</span>
            <div className="flex items-end justify-between">
              <span className={`text-xl sm:text-2xl font-black tracking-tight ${kpi.alert ? 'text-brand-red animate-pulse-fast' : 'text-white'}`}>{kpi.value}</span>
              <span className={`text-[10px] sm:text-xs font-bold ${kpi.trendUp ? 'text-green-500' : (kpi.alert ? 'text-brand-red' : 'text-white/40')}`}>{kpi.trend}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Central Area - Map & Charts (Col Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Live Stadium Widget */}
          <GlassCard className="p-0 overflow-hidden relative min-h-[350px] sm:min-h-[400px] group border-white/10 hover:border-white/20">
            {/* 3D Interactive Map */}
            <div className="absolute inset-0 z-0">
              <iframe
                title="Stadion X Digital Twin"
                className="w-full h-full border-0"
                src="https://sketchfab.com/models/67602830cbd54d4799e76a6931c5d150/embed?autostart=1&transparent=1&ui_controls=1&ui_infos=0&ui_watermark=0&scrollwheel=1"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none z-10"></div>
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10"></div>
            
            {/* Heatmap Nodes */}
            <div className="absolute top-[40%] left-[30%] w-32 h-32 bg-primary/20 blur-2xl rounded-full animate-pulse-fast pointer-events-none z-10"></div>
            <div className="absolute top-[60%] right-[25%] w-40 h-40 bg-brand-red/20 blur-2xl rounded-full animate-pulse-fast pointer-events-none z-10" style={{animationDelay: '1s'}}></div>
            
            <div className="relative z-20 p-4 sm:p-6 h-full flex flex-col justify-between pointer-events-none min-h-[350px] sm:min-h-[400px]">
              <div className="flex justify-between items-start pt-12">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-flex items-center gap-2 shadow-lg">
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-primary">stadium</span>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Live Density Map</span>
                </div>
                
                {/* Overlay Tags */}
                <div className="flex flex-col gap-2">
                  <div className="bg-brand-red/20 border border-brand-red/50 text-brand-red px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(255,59,48,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-blink"></span> Gate 3 Congestion
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Data points */}
            <div className="absolute top-[45%] left-[35%] group/point cursor-pointer z-20">
               <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full border-2 border-black shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
               <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 px-3 py-2 rounded-xl text-xs whitespace-nowrap opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none">
                 <p className="font-bold text-white mb-0.5 text-[11px] sm:text-xs">North Concourse</p>
                 <p className="text-white/60 text-[10px] sm:text-[11px]">Density: 65%</p>
               </div>
            </div>
          </GlassCard>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-5 flex flex-col hover:border-white/20 group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white/80 uppercase tracking-widest text-[10px] sm:text-xs">Entry Flow Rate</h3>
                <span className="material-symbols-outlined text-white/30 text-[16px] sm:text-[18px]">trending_up</span>
              </div>
              <div className="h-32 sm:h-40 flex items-end gap-1 sm:gap-1.5 w-full">
                {[40, 50, 80, 95, 100, 60, 30].map((val, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-primary/10 to-primary/40 hover:to-primary hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] rounded-t-sm sm:rounded-t transition-all relative group/bar cursor-pointer" style={{ height: `${val}%` }}>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 text-white text-[10px] sm:text-xs px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity backdrop-blur-md shadow-xl z-10 pointer-events-none">
                       {val}k
                     </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] sm:text-[10px] text-white/30 font-mono mt-3 uppercase tracking-widest border-t border-white/5 pt-3">
                <span>12:00</span>
                <span className="text-primary/70">14:00 (Now)</span>
                <span>16:00</span>
              </div>
            </GlassCard>

            <GlassCard className="p-5 flex flex-col hover:border-white/20 group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white/80 uppercase tracking-widest text-[10px] sm:text-xs">Concession Demand</h3>
                <span className="material-symbols-outlined text-white/30 text-[16px] sm:text-[18px]">fastfood</span>
              </div>
              <div className="h-32 sm:h-40 flex items-end gap-1 sm:gap-1.5 w-full">
                {[20, 30, 40, 100, 80, 50, 40].map((val, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-500/10 to-blue-500/40 hover:to-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-t-sm sm:rounded-t transition-all relative group/bar cursor-pointer" style={{ height: `${val}%` }}>
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 text-white text-[10px] sm:text-xs px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity backdrop-blur-md shadow-xl z-10 pointer-events-none">
                       {val}%
                     </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] sm:text-[10px] text-white/30 font-mono mt-3 uppercase tracking-widest border-t border-white/5 pt-3">
                <span>First Half</span>
                <span className="text-blue-400">Halftime</span>
                <span>Second Half</span>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Sidebar - Intelligence & Feed (Col Span 4) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* ARC Recommendation */}
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 rounded-[24px] p-5 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                <span className="material-symbols-outlined text-primary text-[16px]">psychology</span>
              </div>
              <span className="font-bold text-primary text-[10px] sm:text-xs uppercase tracking-widest">ARC Intelligence</span>
            </div>
            <p className="text-white/90 text-xs sm:text-sm font-medium leading-relaxed mb-5 relative z-10">
              High density detected at <span className="text-white font-bold">Gate 3</span>. Recommend opening auxiliary egress Corridors B & C to reduce wait times.
            </p>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[9px] sm:text-[10px] text-white/60 font-mono uppercase tracking-widest">Confidence: 96%</span>
              <button className="bg-primary hover:bg-primary/90 text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95">Action</button>
            </div>
          </div>

          {/* Timeline Feed */}
          <GlassCard className="p-5 flex-1 flex flex-col min-h-[300px] border-white/5 hover:border-white/10 transition-colors">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white/80 uppercase tracking-widest text-[10px] sm:text-xs">Live Feed</h3>
                <span className="material-symbols-outlined text-white/30 text-[16px] sm:text-[18px]">history</span>
             </div>
             
             <div className="flex-1 overflow-y-auto pr-2 space-y-4 sm:space-y-5 custom-scrollbar relative">
               <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10"></div>
               
               {[
                 { time: '11:46', msg: 'Crowd normalized at Gate 1', type: 'info', icon: 'check_circle' },
                 { time: '11:44', msg: 'Camera 4A offline', type: 'error', icon: 'videocam_off' },
                 { time: '11:43', msg: 'Medical request Sect 204', type: 'warning', icon: 'medical_services' },
                 { time: '11:40', msg: 'Gate 3 opened', type: 'info', icon: 'meeting_room' },
                 { time: '11:15', msg: 'VIP arrival logged', type: 'info', icon: 'star' },
               ].map((event, i) => (
                 <div key={i} className="flex gap-4 relative z-10 group">
                   <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 border-2 border-black flex items-center justify-center shadow-md
                      ${event.type === 'error' ? 'bg-brand-red shadow-[0_0_8px_rgba(255,59,48,0.5)]' : (event.type === 'warning' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-primary/80')}
                   `}></div>
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-wider">{event.time}</span>
                     </div>
                     <p className="text-[11px] sm:text-xs font-medium text-white/70 group-hover:text-white transition-colors">{event.msg}</p>
                   </div>
                 </div>
               ))}
             </div>
          </GlassCard>
          
          {/* Environment & Health Mini widgets */}
          <div className="grid grid-cols-2 gap-4">
             <GlassCard className="p-4 sm:p-5 flex flex-col justify-between gap-3 hover:border-white/20 transition-colors">
               <div className="flex justify-between items-start">
                 <span className="material-symbols-outlined text-white/50 text-[18px] sm:text-[20px]">thermostat</span>
               </div>
               <div>
                 <p className="text-xl sm:text-2xl font-black text-white tracking-tight">29°C</p>
                 <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Clear • 12km/h</p>
               </div>
             </GlassCard>
             <GlassCard className="p-4 sm:p-5 flex flex-col justify-between gap-3 hover:border-white/20 transition-colors">
               <div className="flex justify-between items-start">
                 <span className="material-symbols-outlined text-green-500 text-[18px] sm:text-[20px] drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">wifi</span>
               </div>
               <div>
                 <p className="text-xl sm:text-2xl font-black text-white tracking-tight">100%</p>
                 <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Network Health</p>
               </div>
             </GlassCard>
          </div>
          
        </div>
      </div>
    </div>
  );
};
