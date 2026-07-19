import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore';

export const TopNav: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full flex justify-between items-center px-4 sm:px-6 h-16 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-500">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[14px] object-cover bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
            <img src="/logo.png" alt="Stadion X" className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <h1 className="font-semibold text-xl sm:text-2xl tracking-tight text-white hidden sm:block">Stadion X</h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <button aria-label="Notifications" onClick={() => addToast('No new notifications', 'info')} className="hover:bg-white/10 transition-colors duration-300 p-2 sm:p-3 rounded-full active:scale-95 relative group text-white/80 mr-2">
          <span className="material-symbols-outlined text-[28px] group-hover:text-white transition-colors" aria-hidden="true">notifications</span>
          {user?.role === 'employee' && (
             <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-brand-red rounded-full animate-pulse-fast shadow-[0_0_10px_#FF3B30] border-2 border-black"></span>
          )}
        </button>
        
        <div className="relative group cursor-pointer flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 p-1.5 pr-3 rounded-full transition-all duration-300">
          <div className="relative">
            <img 
              src={(user?.photoURL && !user.photoURL.includes('dicebear.com/7.x/avataaars')) ? user.photoURL : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.displayName || 'User'}&backgroundColor=000000&textColor=ffffff`} 
              alt={`${user?.displayName || 'User'} profile`} 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 object-cover relative z-10" 
            />
          </div>
          <div className="hidden md:block text-left mr-1">
             <p className="text-white font-medium text-sm tracking-tight leading-tight">{user?.displayName}</p>
             <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">{user?.role}</p>
          </div>
          <span className="material-symbols-outlined text-[18px] text-white/40 group-hover:text-white/80 transition-colors hidden md:block" aria-hidden="true">expand_more</span>
        </div>

        <button aria-label="Logout" onClick={handleLogout} className="hover:bg-red-500/20 text-red-500 transition-colors duration-300 p-2 sm:p-3 rounded-full active:scale-95 group ml-1 sm:ml-2">
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">logout</span>

        </button>
      </div>
    </header>
  );
};
