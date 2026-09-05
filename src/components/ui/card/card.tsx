import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative rounded-card border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-6 shadow-card hover:border-accent-indigo/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 transition-all duration-300 ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
