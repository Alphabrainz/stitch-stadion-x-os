import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/ops', icon: 'layers', label: 'Digital Twin' },
  { path: '/ops/incidents', icon: 'emergency', label: 'Incident Feeds' },
  { path: '/ops/analytics', icon: 'monitoring', label: 'Analytics' },
];

export const SideNav: React.FC = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-20 h-[calc(100vh-80px)] w-64 bg-black/40 backdrop-blur-3xl border-r border-white/10 flex-col py-8 gap-4 z-40 transition-all duration-500 shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
      <div className="px-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-lg">
            <span className="material-symbols-outlined text-red-500 text-[24px]">security</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight text-white drop-shadow-md">Mission Control</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_#FF0000]"></span>
              <p className="font-mono text-[10px] tracking-widest text-red-500 uppercase opacity-90">Active Ops</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/ops'}
            className={({ isActive }) => 
              `flex items-center gap-4 rounded-xl p-3 sm:p-4 transition-all duration-300 font-medium text-sm tracking-wide relative overflow-hidden group ${
                isActive 
                  ? 'bg-white/10 text-white border border-white/10 shadow-sm' 
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px] relative z-10">{item.icon}</span>
            <span className="relative z-10">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="px-6 mb-6 mt-auto">
        <button className="w-full bg-brand-red/10 border-2 border-brand-red text-brand-red font-semibold text-sm tracking-wide py-3.5 rounded-xl hover:bg-brand-red hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,59,48,0.2)] hover:shadow-[0_0_25px_rgba(255,59,48,0.4)] hover:scale-105 active:scale-95 animate-pulse-fast group">
          <span className="material-symbols-outlined text-[20px] group-hover:animate-spin">emergency</span>
          Deploy Response
        </button>
      </div>
    </aside>
  );
};
