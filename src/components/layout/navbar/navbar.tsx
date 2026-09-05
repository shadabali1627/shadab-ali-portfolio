import React from 'react';
import { FileDown, Sparkles } from 'lucide-react';
import { NavbarMobile } from './navbar-mobile';

interface NavbarProps {
  settings?: any;
  resumeData?: any;
  profile?: any;
}

export function Navbar({ settings, resumeData, profile }: NavbarProps) {
  const logoText = settings?.logoText || "SA";
  const name = profile?.name || settings?.title || "Shadab Ali";

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 max-w-[1140px] mx-auto px-4 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto h-14 rounded-full border border-white/10 bg-[#050508]/85 backdrop-blur-2xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] px-4 sm:px-6 flex items-center justify-between transition-all duration-300 hover:border-white/15">
        {/* Left: Brand Monogram & Status */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 text-white font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.35)] group-hover:scale-105 transition-transform">
              {logoText}
            </div>
            {name && (
              <span className="text-sm font-bold tracking-tight text-white/90 group-hover:text-white transition-colors hidden sm:inline-block">
                {name}
              </span>
            )}
          </a>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide">AVAILABLE FOR WORK</span>
          </div>
        </div>

        {/* Center/Right: Desktop Nav Links & Actions */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <a
            href="#about"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            Experience
          </a>

          {resumeData?.resumeFileUrl && (
            <a
              href="#resume"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all"
            >
              <FileDown className="w-3.5 h-3.5 text-indigo-400" />
              <span>Resume</span>
            </a>
          )}

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            <span>Contact</span>
          </a>
        </nav>

        {/* Mobile Navigation Trigger */}
        <NavbarMobile resumeData={resumeData} />
      </div>
    </header>
  );
}
