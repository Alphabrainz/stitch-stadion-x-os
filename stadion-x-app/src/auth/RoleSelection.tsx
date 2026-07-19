import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, type Role } from '../store/useAuthStore';
import { supabase } from '../lib/supabase';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { user, setRole } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRoleSelect = React.useCallback(async (role: Role) => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('users')
        .upsert({ 
          id: user.uid, 
          role: role, 
          email: user.email, 
          updated_at: new Date().toISOString() 
        });
        
      if (error) throw error;
      
      setRole(role);
      navigate(role === 'fan' ? '/fan' : '/ops', { replace: true });
    } catch (error) {
      console.error("Error saving role to Supabase", error);
      console.warn("Falling back to local state routing due to Supabase error.");
      setRole(role);
      navigate(role === 'fan' ? '/fan' : '/ops', { replace: true });
    } finally {
      setIsSaving(false);
    }
  }, [user, navigate, setRole]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden animate-fade-in-up z-10 selection:bg-white/20">
      
      {/* Dynamic Cursor Gradient */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.35), rgba(255, 59, 48, 0.2), transparent 50%)`
        }}
      />
      
      <div className="liquid-glass p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[3rem] w-full max-w-5xl relative z-10 flex flex-col items-center gap-12 sm:gap-16">
        
        <div className="text-center w-full max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md text-white/80 font-medium text-xs px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 border border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
            Security Checkpoint
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Initialize Profile</h2>
          <p className="text-white/50 text-base sm:text-lg font-medium">Select your authorization clearance level to enter the platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
          {/* Fan Role */}
          <button 
            onClick={() => handleRoleSelect('fan')}
            disabled={isSaving}
            aria-label="Select Fan Role"
            className="group liquid-glass p-8 sm:p-10 rounded-[2rem] flex flex-col items-center sm:items-start text-center sm:text-left gap-6 transition-all duration-500 active:scale-95 disabled:opacity-50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors duration-500 shadow-xl backdrop-blur-md">
              <span className="material-symbols-outlined text-[32px] sm:text-[40px] text-white/90 group-hover:scale-110 group-hover:text-primary transition-all duration-500">stadium</span>
            </div>
            
            <div className="z-10">
               <h3 className="font-semibold text-2xl tracking-tight text-white group-hover:text-primary transition-colors duration-300 mb-2">Fan Experience</h3>
               <p className="text-sm text-white/50 leading-relaxed font-medium">Access digital tickets, interactive seat maps, and order food directly to your seat.</p>
            </div>
          </button>

          {/* Employee Role */}
          <button 
            onClick={() => handleRoleSelect('employee')}
            disabled={isSaving}
            aria-label="Select Employee Role"
            className="group liquid-glass p-8 sm:p-10 rounded-[2rem] flex flex-col items-center sm:items-start text-center sm:text-left gap-6 transition-all duration-500 active:scale-95 disabled:opacity-50 relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.02] to-transparent pointer-events-none"></div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center group-hover:bg-brand-red/10 transition-colors duration-500 shadow-xl backdrop-blur-md">
              <span className="material-symbols-outlined text-[32px] sm:text-[40px] text-white/90 group-hover:scale-110 group-hover:text-brand-red transition-all duration-500">security</span>
            </div>

            <div className="z-10">
               <h3 className="font-semibold text-2xl tracking-tight text-white group-hover:text-brand-red transition-colors duration-300 mb-2">Mission Control</h3>
               <p className="text-sm text-white/50 leading-relaxed font-medium">Tactical overview, real-time incident management, and predictive crowd monitoring AI.</p>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
};
