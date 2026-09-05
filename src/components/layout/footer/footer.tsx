import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  settings?: any;
}

export function Footer({ settings }: FooterProps) {
  const title = settings?.title || "Shadab Ali";
  const socialLinks = settings?.socialLinks || [];

  return (
    <footer className="bg-[#030305] border-t border-white/[0.06] py-14 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold tracking-tight text-white">{title}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
              AI Engineer
            </span>
          </div>
          <p className="text-xs font-mono text-slate-500">
            Crafted with Next.js, Sanity & Tailwind · © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link: any, idx: number) => (
            <a 
              key={idx} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-indigo-500/40 transition-all capitalize"
            >
              {link.platform}
            </a>
          ))}

          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all ml-2"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
