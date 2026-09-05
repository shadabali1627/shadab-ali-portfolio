import React from 'react';
import { FileDown } from 'lucide-react';

interface HeroCtaRowProps {
  resumeUrl?: string;
  resumeVersion?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export function HeroCtaRow({ 
  resumeUrl, 
  resumeVersion,
  primaryCtaText = "View Projects",
  primaryCtaLink = "#projects",
  secondaryCtaText = "Contact Me",
  secondaryCtaLink = "#contact"
}: HeroCtaRowProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start items-center gap-3.5 w-full">
      {/* Primary CTA */}
      <a
        href={primaryCtaLink}
        className="group relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm w-full sm:w-auto text-center
                   bg-gradient-to-r from-indigo-500 to-purple-600 text-white
                   shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
                   hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          {primaryCtaText}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </span>
      </a>

      {/* Secondary CTA */}
      <a
        href={secondaryCtaLink}
        className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm w-full sm:w-auto text-center
                   border border-white/10 bg-white/[0.03] backdrop-blur-md text-slate-200
                   hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white hover:scale-[1.02] active:scale-[0.98]
                   transition-all duration-200"
      >
        {secondaryCtaText}
      </a>

      {/* Resume download — URL from CMS */}
      {resumeUrl && (
        <a
          href={resumeUrl}
          download
          className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-mono w-full sm:w-auto
                     text-slate-300 border border-white/10 bg-white/[0.02] backdrop-blur-md
                     hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:scale-[1.02] active:scale-[0.98]
                     transition-all duration-200"
        >
          <FileDown className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
          <span>Resume</span>
          {resumeVersion && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/10 text-slate-400">
              {resumeVersion}
            </span>
          )}
        </a>
      )}
    </div>
  );
}
