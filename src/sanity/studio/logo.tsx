import React from 'react';

export function StudioLogo() {
  return (
    <div className="flex items-center justify-center p-1 rounded-md bg-[#0f0f13] aspect-square w-8 h-8">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="studioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <text 
          x="50%" 
          y="50%"
          dy=".35em" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontSize="340" 
          fontWeight="900" 
          textAnchor="middle" 
          fill="url(#studioGrad)"
        >
          S
        </text>
      </svg>
    </div>
  );
}
