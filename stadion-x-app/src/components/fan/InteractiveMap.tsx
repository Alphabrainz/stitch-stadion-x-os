import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { useToastStore } from '../../store/useToastStore';

export const InteractiveMap: React.FC = () => {
  const { addToast } = useToastStore();
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in slide-in-from-right-8 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-display text-3xl font-black uppercase tracking-widest text-primary mb-2">Stadium Navigation</h2>
          <p className="text-secondary">Find your way around the smart stadium.</p>
        </div>
        <Badge variant="info" className="bg-primary/10 text-primary border-primary/30"><span className="material-symbols-outlined text-[14px]">near_me</span> Location Services Active</Badge>
      </div>

      <GlassCard className="p-0 relative aspect-[16/9] w-full overflow-hidden border-primary/30 group">
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="info" className="bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono shadow-2xl">
            DIGITAL_TWIN_V2
          </Badge>
        </div>

        {/* Real 3D Interactive Digital Twin */}
        <iframe 
          title="3D Stadium Viewer" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true" 
          execution-while-out-of-viewport="true" 
          execution-while-not-rendered="true" 
          web-share="true" 
          src="https://sketchfab.com/models/67602830cbd54d4799e76a6931c5d150/embed?autostart=1&camera=0&preload=1&transparent=1&ui_infos=0&ui_controls=1&ui_stop=0&ui_watermark=0" 
          className="w-full h-full bg-black/50"
        ></iframe>

        {/* Overlay Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
          <span className="bg-black/80 text-white text-xs px-4 py-2 rounded-full backdrop-blur-md uppercase tracking-widest border border-white/10 flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px] animate-pulse text-primary">touch_app</span> 
            Pinch to zoom, drag to rotate
          </span>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => addToast('Routing to nearest Food Concession...', 'info')} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-primary/50 text-white transition-all active:scale-95">
          <span className="material-symbols-outlined">restaurant</span> Food
        </button>
        <button onClick={() => addToast('Routing to nearest Washroom...', 'info')} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-primary/50 text-white transition-all active:scale-95">
          <span className="material-symbols-outlined">wc</span> Washrooms
        </button>
        <button onClick={() => addToast('Routing to Official Merch Store...', 'info')} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-primary/50 text-white transition-all active:scale-95">
          <span className="material-symbols-outlined">shopping_bag</span> Merch
        </button>
        <button onClick={() => addToast('Routing to nearest Medical Tent...', 'info')} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-primary/50 text-white transition-all active:scale-95">
          <span className="material-symbols-outlined">local_hospital</span> Medical
        </button>
      </div>
      
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
};
