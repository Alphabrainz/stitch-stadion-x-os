import React from 'react';
import { NavLink } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore';

const fanNavItems = [
  { path: '/fan', icon: 'home', label: 'Dashboard' },
  { path: '/fan/tickets', icon: 'local_activity', label: 'Digital Pass' },
  { path: '/fan/food', icon: 'restaurant', label: 'Food & Drink' },
  { path: '/fan/map', icon: 'map', label: 'Navigation' },
];

const arcFinders = [
  { name: 'My Seat', icon: 'event_seat' },
  { name: 'Parking', icon: 'local_parking' },
  { name: 'Washroom', icon: 'wc' },
  { name: 'Medical', icon: 'local_hospital' },
  { name: 'Exit', icon: 'meeting_room' }
];

interface FanSidebarProps {
  isMinimized: boolean;
  setIsMinimized: (val: boolean) => void;
}

export const FanSidebar: React.FC<FanSidebarProps> = ({ isMinimized, setIsMinimized }) => {
  const { addToast } = useToastStore();

  return (
    <aside 
      className={`hidden md:flex fixed left-0 top-20 h-[calc(100vh-80px)] bg-black/80 backdrop-blur-3xl border-r border-white/10 flex-col py-6 gap-4 z-40 transition-all duration-500 shadow-[20px_0_40px_rgba(0,0,0,0.5)] ${
        isMinimized ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex justify-end px-4 mb-4">
        <button 
          onClick={() => setIsMinimized(!isMinimized)}
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">
            {isMinimized ? 'menu' : 'menu_open'}
          </span>
        </button>
      </div>

      <nav className="flex flex-col gap-2 px-3">
        {fanNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/fan'}
            className={({ isActive }) => 
              `flex items-center rounded-xl transition-all duration-300 overflow-hidden group ${
                isMinimized ? 'justify-center p-3 w-14 h-14 mx-auto' : 'gap-4 p-3 px-4'
              } ${
                isActive 
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
            title={isMinimized ? item.label : undefined}
          >
            <span className="material-symbols-outlined text-[22px] flex-shrink-0">{item.icon}</span>
            {!isMinimized && <span className="font-bold tracking-wider text-sm uppercase whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 flex flex-col gap-2">
        {!isMinimized && (
          <div className="px-2 mb-2 flex items-center gap-2 text-primary border-b border-white/10 pb-2 overflow-hidden whitespace-nowrap">
            <span className="material-symbols-outlined text-lg">smart_toy</span>
            <span className="font-bold text-xs tracking-widest uppercase">ARC Finders</span>
          </div>
        )}
        
        {arcFinders.map((finder, idx) => (
          <button 
            key={idx}
            onClick={() => addToast(`ARC is routing you to the nearest ${finder.name}...`, 'info')}
            className={`flex items-center rounded-xl transition-all duration-300 overflow-hidden group border border-white/5 hover:border-primary/50 text-white/80 hover:text-white bg-white/5 hover:bg-primary/10 ${
              isMinimized ? 'justify-center p-3 w-14 h-14 mx-auto' : 'gap-4 p-3 px-4'
            }`}
            title={isMinimized ? `Find ${finder.name}` : undefined}
          >
            <span className="material-symbols-outlined text-[20px] text-primary/70 group-hover:text-primary flex-shrink-0">{finder.icon}</span>
            {!isMinimized && <span className="font-bold tracking-wider text-xs uppercase whitespace-nowrap">{finder.name}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
};
