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
    <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start items-center gap-3 w-full">
      {/* Primary CTA */}
      <a href={primaryCtaLink}
         className="px-6 py-3 rounded-full font-semibold text-sm w-full sm:w-auto text-center
                    bg-gradient-to-r from-[#6366f1] to-[#a855f7]
                    text-white hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]
                    hover:scale-[1.02] transition-all duration-200">
        {primaryCtaText}
      </a>

      {/* Secondary CTA */}
      <a href={secondaryCtaLink}
         className="px-6 py-3 rounded-full font-semibold text-sm w-full sm:w-auto text-center
                    border border-white/20 text-[#f8fafc]
                    hover:border-[#6366f1]/60 hover:bg-[#6366f1]/10
                    transition-all duration-200">
        {secondaryCtaText}
      </a>

      {/* Resume download — URL from CMS */}
      {resumeUrl && (
        <a href={resumeUrl}
           download
           className="inline-flex items-center justify-center gap-2
                      px-4 py-3 rounded-full text-sm font-mono w-full sm:w-auto
                      text-[#94a3b8] border border-white/10
                      hover:text-white hover:border-white/30
                      transition-all duration-200">
          <FileDown className="w-4 h-4" />
          Resume
          {resumeVersion && (
            <span className="text-xs text-[#475569]">
              {resumeVersion}
            </span>
          )}
        </a>
      )}
    </div>
  );
}
