import React from 'react';
import { useToastStore } from '../../store/useToastStore';
import { cn } from '../../lib/utils';

export const ToastProvider: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
      {toasts.map((toast) => {
        
        const typeStyles = {
          info: 'bg-primary/20 border-primary/50 text-white',
          success: 'bg-green-500/20 border-green-500/50 text-white',
          warning: 'bg-yellow-500/20 border-yellow-500/50 text-white',
          error: 'bg-brand-red/20 border-brand-red/50 text-white'
        };

        const icons = {
          info: 'info',
          success: 'check_circle',
          warning: 'warning',
          error: 'error'
        };

        return (
          <div 
            key={toast.id}
            className={cn(
              "p-4 rounded-xl backdrop-blur-xl border flex items-center gap-3 shadow-2xl pointer-events-auto animate-in slide-in-from-right-8 duration-300",
              typeStyles[toast.type]
            )}
          >
            <span className="material-symbols-outlined">{icons[toast.type]}</span>
            <span className="font-bold tracking-widest text-sm uppercase">{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-4 opacity-50 hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};
