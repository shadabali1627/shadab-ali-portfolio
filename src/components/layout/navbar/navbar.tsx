// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';
import { FileDown } from 'lucide-react';
import { NavbarMobile } from './navbar-mobile';

interface NavbarProps {
  settings?: any;
  resumeData?: any;
  profile?: any;
}

export function Navbar({ settings, resumeData, profile }: NavbarProps) {
  const logoText = settings?.logoText || "[YN]";
  const name = profile?.name || settings?.title || "";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center min-w-[36px] px-2 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white font-bold text-sm tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.3)]">
              {logoText}
            </div>
            {name && (
              <span className="text-[15px] font-extrabold bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent hidden sm:block tracking-wide drop-shadow-sm">
                {name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted bg-bg-surface1 px-2 py-1 rounded-full border border-border-default">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
            <span>AVAILABLE FOR WORK</span>
            {/* TODO: fetch availability from Sanity CMS */}
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {/* TODO: fetch from Sanity CMS settings */}
          <a href="#about" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">About</a>
          <a href="#projects" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Projects</a>
          <a href="#experience" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Experience</a>
          
          {resumeData?.resumeFileUrl && (
            <a href={resumeData.resumeFileUrl} download className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-default bg-bg-surface1 text-sm font-medium text-text-primary hover:text-accent-indigo hover:border-accent-indigo/50 hover:bg-accent-indigo/10 transition-all duration-200">
              <FileDown className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          )}

          <a href="#contact" className="px-5 py-2 rounded-full font-semibold text-sm bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] transition-all duration-200">Contact Me</a>
        </nav>

        <NavbarMobile resumeData={resumeData} />
      </div>
    </header>
  );
}
