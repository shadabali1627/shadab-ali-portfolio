import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    let variantStyles = '';
    
    switch (variant) {
      case 'primary':
        variantStyles = 'bg-gradient-primary rounded-pill shadow-glow hover:shadow-glow-cyan text-text-primary';
        break;
      case 'secondary':
        variantStyles = 'bg-transparent border border-border-default hover:border-border-hover text-text-primary';
        break;
      case 'ghost':
        variantStyles = 'bg-transparent text-text-secondary hover:text-text-primary hover:underline';
        break;
      case 'icon':
        variantStyles = 'bg-transparent border border-border-default hover:border-border-hover text-text-primary w-11 h-11 flex items-center justify-center rounded-full p-0';
        break;
    }

    return (
      <button
        ref={ref}
        className={`px-4 py-2 font-sans transition-all duration-300 min-h-[44px] inline-flex items-center justify-center ${variantStyles} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
