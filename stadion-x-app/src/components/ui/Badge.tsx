import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'live';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'info', children, ...props }) => {
  const variants = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    danger: 'bg-brand-red/20 text-brand-red border-brand-red/30',
    info: 'bg-white/10 text-white border-white/20',
    live: 'bg-black/80 text-primary border-primary/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)]'
  };

  return (
    <span 
      className={cn("px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border flex items-center gap-2", variants[variant], className)}
      {...props}
    >
      {variant === 'live' && (
        <span className="w-2 h-2 rounded-full bg-primary animate-breathe shadow-[0_0_8px_#D4AF37]"></span>
      )}
      {children}
    </span>
  );
};
