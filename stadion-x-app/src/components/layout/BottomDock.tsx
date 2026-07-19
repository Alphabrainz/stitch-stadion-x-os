import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SOSModal } from '../fan/SOSModal';
import { useAuthStore } from '../../store/useAuthStore';

const fanNavItems = [
  { path: '/fan', icon: 'home', label: 'Dashboard' },
  { path: '/fan/tickets', icon: 'local_activity', label: 'Tickets' },
  { path: '/fan/map', icon: 'map', label: 'Navigate' },
  { path: '/fan/food', icon: 'restaurant', label: 'Food' },
  { path: '/fan/leaderboard', icon: 'emoji_events', label: 'Standings' },
];

const opsNavItems = [
  { path: '/ops', icon: 'layers', label: 'Digital Twin' },
  { path: '/ops/incidents', icon: 'emergency', label: 'Incident Feeds' },
  { path: '/ops/analytics', icon: 'monitoring', label: 'Analytics' },
];

export const BottomDock: React.FC = () => {
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const { user } = useAuthStore();
  const isEmployee = user?.role === 'employee';
  
  const navItems = isEmployee ? opsNavItems : fanNavItems;

  return (
    <>
      <div className={`fixed bottom-0 w-full z-[100] flex justify-center pb-6 pointer-events-none ${isEmployee ? 'md:hidden' : ''}`}>
        <div className="pointer-events-auto bg-black/60 backdrop-blur-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/fan' || item.path === '/ops'}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-white/10 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] -translate-y-2' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="material-symbols-outlined text-[24px] sm:text-[28px] relative z-10">{item.icon}</span>
                  {/* Active glowing dot */}
                  <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,175,55,1)] transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                </>
              )}
            </NavLink>
          ))}
          
          {/* Emergency SOS Button for Fans Only */}
          {!isEmployee && (
            <>
              <div className="w-px h-8 sm:h-10 bg-white/10 mx-1 sm:mx-2"></div>
              <button 
                onClick={() => setIsSOSOpen(true)}
                className="flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg animate-pulse"
              >
                  <span className="material-symbols-outlined text-[24px] sm:text-[28px]">sos</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      {!isEmployee && <SOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />}
    </>
  );
};
