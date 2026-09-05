import React from 'react';
import { SectionLabel, Card, Badge } from '@/components/ui';
import { CheckCircle2, ArrowUpRight, Globe } from 'lucide-react';

interface ExperienceSectionProps {
  data?: any; // TODO: fetch from Sanity CMS
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
};

// Helper to parse raw text with bullets into an array of strings
const parseDescription = (desc: string) => {
  if (!desc) return [];
  // Split by newlines and remove leading bullets and extra spaces
  return desc.split('\n').map(line => line.replace(/^[\s•\-\*]+/, '').trim()).filter(line => line.length > 0);
};

// Helper to resolve company website URL with smart fallback for StratSkye and 88 Hours
const getCompanySiteInfo = (companyName: string, cmsUrl?: string) => {
  if (cmsUrl && cmsUrl.trim()) {
    try {
      const parsed = new URL(cmsUrl);
      return { url: cmsUrl, domain: parsed.hostname.replace(/^www\./, '') };
    } catch {
      return { url: cmsUrl, domain: cmsUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] };
    }
  }

  const normalized = (companyName || '').toLowerCase().replace(/[\s\.\-_]/g, '');
  if (normalized.includes('stratskye')) {
    return { url: 'https://stratskye.com', domain: 'stratskye.com' };
  }
  if (normalized.includes('88hour') || normalized.includes('88hours')) {
    return { url: 'https://88hours.io', domain: '88hours.io' };
  }

  return null;
};

export function ExperienceSection({ data }: ExperienceSectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-[#030305] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <SectionLabel label="CAREER TRAJECTORY" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3">
              Work Experience
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md">
            Track record of driving technical engineering, AI architecture, and product growth across fast-paced environments.
          </p>
        </div>

        <div className="relative ml-3 sm:ml-6 pl-6 sm:pl-10 md:pl-12 flex flex-col gap-10">
          {/* Vertical timeline line with gradient stroke */}
          <div className="absolute left-0 top-3 bottom-8 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500/40 to-transparent" />
          
          {data.map((exp: any, idx: number) => {
            const parsedDesc = parseDescription(exp.description);
            const isPresent = exp.current;
            const companySite = getCompanySiteInfo(exp.company, exp.companyUrl);

            return (
              <div key={idx} className="relative group">
                {/* Modern Timeline Node */}
                <div 
                  className={`absolute -left-[30px] sm:-left-[42px] md:-left-[54px] top-6 h-4 w-4 rounded-full border-2 border-[#050508] z-10 transition-all duration-300 ${
                    isPresent 
                      ? 'bg-indigo-500 shadow-[0_0_18px_rgba(99,102,241,0.9)] animate-pulse' 
                      : 'bg-slate-700 group-hover:bg-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                  }`} 
                />
                
                {/* Bento Experience Card */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.12)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-indigo-200 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        {exp.companyLogoUrl && (
                          <img 
                            src={exp.companyLogoUrl} 
                            alt={exp.company} 
                            className="h-7 w-auto rounded-lg object-contain bg-white/10 p-1 border border-white/10" 
                          />
                        )}
                        <span className="text-base text-slate-200 font-medium">{exp.company}</span>

                        {companySite && (
                          <a
                            href={companySite.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.08] text-xs font-mono text-slate-400 hover:text-white transition-all duration-200 shadow-sm"
                            title={`Visit ${exp.company} website (${companySite.domain})`}
                          >
                            <Globe className="w-3 h-3 text-indigo-400 group-hover/link:text-cyan-400 transition-colors" />
                            <span className="hidden sm:inline text-[11px] text-slate-300 group-hover/link:text-white transition-colors">{companySite.domain}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Metadata Badge */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 font-mono text-xs text-indigo-300 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/30 whitespace-nowrap shadow-sm">
                        {isPresent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        {formatDate(exp.startDate)} — {isPresent ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>

                  {parsedDesc.length > 0 && (
                    <ul className="flex flex-col gap-3 mb-6">
                      {parsedDesc.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 leading-relaxed text-sm sm:text-base">
                          <CheckCircle2 className="w-4 h-4 mt-1 text-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                      {exp.technologies.map((tech: string, techIdx: number) => (
                        <span 
                          key={techIdx} 
                          className="px-3 py-1 rounded-full text-[11px] font-mono border border-white/10 bg-white/[0.03] text-slate-300 hover:border-indigo-500/40 hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
