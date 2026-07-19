import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'base' | 'liquid' | 'glow';
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, variant = 'base', ...props }, ref) => {
    
    const variants = {
      base: 'glass-card',
      liquid: 'liquid-glass',
      glow: 'bg-black/40 backdrop-blur-[40px] border border-primary/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] rounded-2xl'
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';
