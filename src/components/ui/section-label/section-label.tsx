import React from 'react';

interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  number?: string;
  label: string;
}

export const SectionLabel = React.forwardRef<HTMLSpanElement, SectionLabelProps>(
  ({ number, label, className = '', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-3 font-mono text-[13px] text-[#06b6d4] uppercase tracking-[0.2em] font-semibold ${className}`}
        {...props}
      >
        <span className="w-8 h-[2px] rounded-full bg-gradient-to-r from-[#06b6d4] to-transparent opacity-70" />
        {label}
      </span>
    );
  }
);
SectionLabel.displayName = 'SectionLabel';
