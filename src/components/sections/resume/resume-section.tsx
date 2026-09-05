import React from 'react';
import { FileDown, ExternalLink, Award, GraduationCap, BadgeCheck } from 'lucide-react';
import { SectionLabel } from '@/components/ui';

interface ResumeSectionProps {
  data: any; // Type as needed
}

const credentialIcons: Record<string, React.ElementType> = {
  Degree:        GraduationCap,
  Certification: BadgeCheck,
  Award:         Award,
  default:       BadgeCheck,
};

export function ResumeSection({ data }: ResumeSectionProps) {
  if (!data?.showResumeSection) return null;

  return (
    <section id="resume" className="relative py-24 bg-[#050508] border-t border-white/[0.06] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 z-10">
        {/* Section label */}
        <SectionLabel label={data.title || 'RESUME & CREDENTIALS'} className="mb-3" />

        {/* Heading row */}
        <div className="mt-3 mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {data.title || 'Resume & Credentials'}
            </h2>
            <p className="mt-2 text-slate-400 text-base md:text-lg max-w-xl">
              {data.subtitle || 'Download my full resume or verify credentials, degrees, and industry certifications below.'}
            </p>
          </div>

        {/* Prominent Resume CTA */}
          {data.resumeFileUrl && (
            <a
              href={data.resumeFileUrl}
              download
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full
                         bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600
                         text-white font-medium text-sm
                         shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)]
                         hover:scale-[1.03] active:scale-[0.98] transition-all duration-200
                         w-fit whitespace-nowrap self-start md:self-auto"
            >
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Download Official Resume</span>
              {data.resumeVersion && (
                <span className="ml-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
                  {data.resumeVersion}
                </span>
              )}
            </a>
          )}
        </div>

        {/* Bento Resume PDF Viewer on Desktop */}
        {data.resumeFileUrl && (
          <div className="hidden md:block w-full mb-16 rounded-3xl border border-white/10 overflow-hidden bg-white/[0.02] backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.6)]">
            {/* Viewer Header / Toolbar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/10 mx-1" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-300 font-medium tracking-wide">
                    {data.resumeVersion
                      ? `Shadab_Ali_Resume_${data.resumeVersion.replace(/\s+/g, '_')}.pdf`
                      : 'Shadab_Ali_Resume.pdf'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    PDF Preview
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={data.resumeFileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen</span>
                </a>
                <a
                  href={data.resumeFileUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
                  title="Download PDF"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Document Viewport */}
            <div className="w-full h-[850px] lg:h-[950px] bg-[#0a0a0f] relative">
              <iframe
                src={`${data.resumeFileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full h-full border-none"
                title="Shadab Ali Resume PDF"
              />
            </div>
          </div>
        )}

        {/* Mobile Resume Action Card */}
        {data.resumeFileUrl && (
          <div className="block md:hidden mb-12 p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <FileDown className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Curriculum Vitae</p>
                <p className="text-xs text-slate-400 font-mono">
                  {data.resumeVersion || 'Official Resume PDF'}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href={data.resumeFileUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View PDF in Browser</span>
              </a>
              <a
                href={data.resumeFileUrl}
                download
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-indigo-600 text-xs font-medium text-white shadow-md hover:bg-indigo-500 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Official Resume</span>
              </a>
            </div>
          </div>
        )}

        {/* Stats Bento Grid — from CMS */}
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-14">
            {data.stats.map((stat: any, index: number) => (
              <div 
                key={index}
                className="group flex flex-col items-center justify-center p-6 sm:p-7 rounded-3xl
                           bg-white/[0.02] border border-white/10 backdrop-blur-xl
                           hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]
                           hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Credentials Grid — from CMS */}
        {data.credentials &&
          data.credentials.filter((c: any) => c && c.title && c.title.trim() !== '' && c.title.trim() !== '—').length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
                Verified Credentials & Honors
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {data.credentials
                  .filter((c: any) => c && c.title && c.title.trim() !== '' && c.title.trim() !== '—')
                  .map((cred: any, index: number) => {
                    const Icon = credentialIcons[cred.type] ?? credentialIcons.default;
                    return (
                      <div 
                        key={index}
                        className="group flex items-start gap-4 p-5 sm:p-6 rounded-3xl
                                   bg-white/[0.02] border border-white/10 backdrop-blur-xl
                                   hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]
                                   hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {/* Icon Badge */}
                        <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                          <Icon className="w-5 h-5 text-indigo-400" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-white text-sm leading-snug group-hover:text-indigo-200 transition-colors">
                              {cred.title}
                            </p>
                            {cred.url && (
                              <a 
                                href={cred.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-md transition-colors"
                                title="Verify Credential"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          {cred.institution && (
                            <p className="mt-1 text-xs text-slate-400 font-mono">
                              {cred.institution}
                            </p>
                          )}
                          <div className="mt-3 flex items-center gap-2">
                            {cred.type && (
                              <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                {cred.type}
                              </span>
                            )}
                            {cred.year && (
                              <span className="text-[10px] font-mono text-slate-500">
                                {cred.year}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
      </div>
    </section>
  );
}
