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
        variantStyles = 'bg-bg-surface2 border-border-default text-white hover:bg-bg-surface1 hover:border-text-muted';
        break;
      case 'indigo':
        variantStyles = 'bg-accent-indigo/20 border-accent-indigo/40 text-white hover:bg-accent-indigo/30 hover:border-accent-indigo/60 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]';
        break;
      case 'cyan':
        variantStyles = 'bg-accent-cyan/20 border-accent-cyan/40 text-white hover:bg-accent-cyan/30 hover:border-accent-cyan/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]';
        break;
      case 'violet':
        variantStyles = 'bg-accent-violet/20 border-accent-violet/40 text-white hover:bg-accent-violet/30 hover:border-accent-violet/60 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]';
        break;
      case 'success':
        variantStyles = 'bg-green-500/20 border-green-500/40 text-white hover:bg-green-500/30 hover:border-green-500/60 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]';
        break;
    }

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2 py-1 border rounded-badge font-mono text-label uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 cursor-default ${variantStyles} ${className}`}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
