import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-bg-surface1 border border-border-default rounded-card p-6 shadow-card hover:border-accent-indigo hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
