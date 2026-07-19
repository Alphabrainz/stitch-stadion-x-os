import React from 'react';
import DOMPurify from 'dompurify';
import { useAuthStore } from '../store/useAuthStore';
import { TopNav } from './TopNav';
import { SideNav } from './SideNav';
import { BottomDock } from './BottomDock';
import { useStadionStore } from '../store/useStadionStore';
import { useInactivityTimeout } from '../hooks/useInactivityTimeout';

interface LayoutShellProps {
  children: React.ReactNode;
}

export const LayoutShell: React.FC<LayoutShellProps> = ({ children }) => {
  const { user } = useAuthStore();
  const isEmployee = user?.role === 'employee';
  const { lockdownMode, setLockdownMode, addIncident } = useStadionStore();

  useInactivityTimeout();

  return (
    <div className="min-h-screen bg-background text-white selection:bg-white/20">
      <TopNav />
      
      {isEmployee && <SideNav />}
      
      {/* On mobile, Ops doesn't get left margin because Sidebar is hidden/stacked. On desktop, they get ml-64 */}
      <main className={`pt-20 min-h-screen transition-all duration-500 pb-32 md:pb-0 ${
        isEmployee ? 'md:ml-64' : ''
      }`}>
        {children}
      </main>

      {/* BottomDock handles displaying different items based on mobile vs desktop and Fan vs Ops */}
      <BottomDock />

      {/* Global Notifications Panel (Bi-directional) */}
      <div role="status" aria-live="polite" className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
        {useStadionStore(state => state.notifications).map(notif => (
          <div key={notif.id} className="pointer-events-auto bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl animate-in slide-in-from-top-4 duration-300 flex items-start gap-3">
            <span className={`material-symbols-outlined mt-0.5
              ${notif.type === 'success' ? 'text-green-500' : 
                notif.type === 'error' ? 'text-brand-red' : 
                notif.type === 'warning' ? 'text-yellow-500' : 'text-primary'}`}>
              {notif.type === 'success' ? 'check_circle' : 
               notif.type === 'error' ? 'error' : 
               notif.type === 'warning' ? 'warning' : 'info'}
            </span>
            <div className="flex-1">
              <p 
                className="text-white text-sm font-medium leading-snug"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notif.message) }}
              ></p>
            </div>
            <button 
              onClick={() => useStadionStore.getState().removeNotification(notif.id)}
              aria-label="Close notification"
              className="text-white/50 hover:text-white transition-colors"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        ))}
      </div>

      {/* Global Lockdown Takeover for Fans */}
      {lockdownMode && !isEmployee && (
        <div role="alert" aria-live="assertive" className="fixed inset-0 z-[999] bg-brand-red flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-multiply opacity-20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-md w-full">
            <span className="material-symbols-outlined text-[120px] text-white animate-pulse drop-shadow-[0_0_40px_rgba(255,255,255,0.8)] mb-4">warning</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-2xl">Lockdown</h1>
            <div className="w-24 h-1 bg-white mb-6 animate-pulse"></div>
            <p className="text-white text-xl font-bold uppercase tracking-wider mb-2">Emergency Protocols Active</p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 border border-white/20 bg-black/20 p-6 rounded-xl backdrop-blur-md">
              Please remain calm and stay in your current location. Follow the instructions of Stadion X security personnel. 
              <br /><br />
              All automated turnstiles have been locked. Concession orders are paused.
            </p>
            
            <button 
              onClick={() => {
                addIncident({ type: 'Security', location: 'Fan Requested SOS', priority: 'Critical' });
                setLockdownMode(false);
              }}
              className="bg-black text-brand-red w-full py-4 rounded-xl font-bold text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-black/80 transition-all border border-brand-red/50 active:scale-95 cursor-pointer pointer-events-auto relative z-[1000]"
            >
              Trigger SOS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
