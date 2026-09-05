// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';
import { SectionLabel, Card, Badge, Button } from '@/components/ui';
import { ExternalLink, Code2, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  data?: any; // TODO: fetch from Sanity CMS
}

function parseBullets(text: string) {
  if (!text) return [];
  // Split by bullet •
  if (text.includes('•')) {
    return text.split('•').map(t => t.trim()).filter(t => t.length > 0);
  }
  // Fallback to -
  if (text.includes('- ')) {
    return text.split('- ').map(t => t.trim()).filter(t => t.length > 0);
  }
  return [text.trim()];
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-[#050508] relative border-t border-white/[0.06] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute left-0 top-1/4 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <SectionLabel number="004" label="FEATURED WORK" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3">
              Selected Projects
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md">
            Engineered systems, AI agents, and production platforms built with meticulous attention to detail and performance.
          </p>
        </div>

        {/* Bento Project Cards */}
        <div className="flex flex-col gap-10">
          {data.map((project: any, idx: number) => {
            const descriptionItems = parseBullets(project.description);

            return (
              <div 
                key={idx} 
                className="group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)] hover:-translate-y-1 transition-all duration-500 flex flex-col lg:flex-row"
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2 bg-[#0a0a10] min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] relative overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                  {project.imageUrl ? (
                    <>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" 
                      />
                      {/* Depth gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#050508]/30 to-[#050508]/80 pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-indigo-950/20 flex flex-col items-center justify-center text-slate-500 font-mono text-xs gap-2">
                      <Code2 className="w-8 h-8 text-indigo-400/40" />
                      <span>Production Build Ready</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 bg-gradient-to-b from-white/[0.01] to-white/[0.03]">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.map((tag: string, tagIdx: number) => (
                        <span 
                          key={tagIdx} 
                          className="px-3 py-1 rounded-full text-[11px] font-mono border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 group-hover:text-indigo-200 transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      {descriptionItems.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                          <span className="leading-relaxed text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        <span>View Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.repository && (
                      <a 
                        href={project.repository} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-slate-300 border border-white/10 bg-white/[0.03] hover:text-white hover:border-white/25 hover:bg-white/[0.06] hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
