import React from 'react';

type BadgeVariant = 'default' | 'indigo' | 'cyan' | 'violet' | 'success';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    let variantStyles = '';
    
    switch (variant) {
      case 'default':
        variantStyles = 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:border-white/20 hover:text-white';
        break;
      case 'indigo':
        variantStyles = 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]';
        break;
      case 'cyan':
        variantStyles = 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]';
        break;
      case 'violet':
        variantStyles = 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]';
        break;
      case 'success':
        variantStyles = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]';
        break;
    }

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-3 py-1 rounded-full border backdrop-blur-sm font-mono text-[11px] tracking-wide transition-all duration-300 hover:-translate-y-0.5 cursor-default ${variantStyles} ${className}`}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
