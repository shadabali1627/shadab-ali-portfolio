import React from 'react';

interface GlowDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export const GlowDot = React.forwardRef<HTMLSpanElement, GlowDotProps>(
  ({ active = true, className = '', ...props }, ref) => {
    if (!active) return null;

    return (
      <span ref={ref} className={`relative flex h-3 w-3 ${className}`} {...props}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    );
  }
);
GlowDot.displayName = 'GlowDot';
