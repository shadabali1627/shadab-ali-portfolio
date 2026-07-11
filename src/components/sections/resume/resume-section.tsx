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
    <section id="resume" className="relative py-[100px] bg-[#050508]">
      {/* Background glow */}
      <div className="absolute inset-0
                      bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_70%)]
                      pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Section label */}
        <SectionLabel label={data.title || 'RESUME & CREDENTIALS'} className="mb-4" />

        {/* Heading row */}
        <div className="mt-4 mb-12 flex flex-col md:flex-row
                        md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-[40px] font-bold text-[#f8fafc]
                           tracking-tight leading-tight">
              {data.title || 'Resume & Credentials'}
            </h2>
            <p className="mt-2 text-[#94a3b8] text-lg">
              {data.subtitle || 'Download my full resume or view credentials below.'}
            </p>
          </div>

          {/* Download button — PDF URL from CMS */}
          {data.resumeFileUrl && (
            <a
              href={data.resumeFileUrl}
              download
              className="group inline-flex items-center gap-3
                         px-6 py-3 rounded-full
                         bg-gradient-to-r from-[#6366f1] to-[#a855f7]
                         text-white font-semibold text-sm
                         hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]
                         hover:scale-[1.02] transition-all duration-200
                         w-fit whitespace-nowrap">
              <FileDown className="w-4 h-4
                                   group-hover:-translate-y-0.5
                                   transition-transform" />
              Download Resume
              {/* Version badge */}
              {data.resumeVersion && (
                <span className="ml-1 text-xs text-white/60 font-mono">
                  {data.resumeVersion}
                </span>
              )}
            </a>
          )}
        </div>

        {/* Inline PDF Viewer */}
        {data.resumeFileUrl && (
          <div className="block w-full h-[500px] md:h-[800px] mb-16 rounded-2xl border border-white/[0.07] overflow-hidden bg-[#0f0f13] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <iframe src={`${data.resumeFileUrl}#toolbar=0&view=Fit`} className="w-full h-full border-none" title="Resume PDF" />
          </div>
        )}

        {/* Stats row — from CMS */}
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {data.stats.map((stat: any, index: number) => (
              <div key={index}
                   className="flex flex-col items-center justify-center
                              p-6 rounded-2xl text-center
                              bg-[#0f0f13] border border-white/[0.07]
                              hover:border-[#6366f1]/50
                              hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]
                              transition-all duration-300">
                <span className="text-4xl font-black
                                 bg-gradient-to-r from-[#6366f1] to-[#a855f7]
                                 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-[#94a3b8] font-mono">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Credentials grid — from CMS */}
        {data.credentials && data.credentials.length > 0 && (
          <>
            <h3 className="text-xl font-bold text-[#f8fafc] mb-6">
              Credentials & Certifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2
                            lg:grid-cols-3 gap-4">
              {data.credentials.map((cred: any, index: number) => {
                const Icon = credentialIcons[cred.type] ?? credentialIcons.default;
                return (
                  <div key={index}
                       className="group flex items-start gap-4 p-5
                                  rounded-2xl bg-[#0f0f13]
                                  border border-white/[0.07]
                                  hover:border-[#6366f1]/40
                                  hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]
                                  transition-all duration-300">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl
                                    bg-[#6366f1]/10 border border-[#6366f1]/20
                                    flex items-center justify-center
                                    group-hover:bg-[#6366f1]/20
                                    transition-colors">
                      <Icon className="w-5 h-5 text-[#6366f1]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-[#f8fafc]
                                      text-sm leading-snug">
                          {cred.title}
                        </p>
                        {cred.url && (
                          <a href={cred.url} target="_blank" rel="noreferrer" className="text-[#94a3b8] hover:text-white transition-colors">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[#94a3b8] font-mono">
                        {cred.institution}
                      </p>
                      <span className="inline-block mt-2 text-[10px]
                                       font-mono uppercase tracking-wider
                                       px-2 py-0.5 rounded-full
                                       bg-[#6366f1]/10 text-[#6366f1]
                                       border border-[#6366f1]/20">
                        {cred.type} · {cred.year}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
