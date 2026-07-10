import React from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, alt, fallback, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-bg-surface2 ${className}`}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="aspect-square h-full w-full object-cover"
            {...props}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium">
            {fallback || "U"}
          </span>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';
