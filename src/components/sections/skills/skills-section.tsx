// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';
import { SectionLabel, Badge, Card } from '@/components/ui';
import { BrainCircuit, Database, Server, LayoutTemplate, Layers, Wrench, Code2, Cpu } from 'lucide-react';

interface SkillsSectionProps {
  data?: any; // TODO: fetch from Sanity CMS
}

function getCategoryIcon(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes('ai') || cat.includes('machine learning') || cat.includes('ml')) return <BrainCircuit className="w-5 h-5 text-accent-indigo" />;
  if (cat.includes('database') || cat.includes('data')) return <Database className="w-5 h-5 text-accent-cyan" />;
  if (cat.includes('backend') || cat.includes('server')) return <Server className="w-5 h-5 text-accent-violet" />;
  if (cat.includes('frontend') || cat.includes('ui')) return <LayoutTemplate className="w-5 h-5 text-accent-cyan" />;
  if (cat.includes('language')) return <Code2 className="w-5 h-5 text-accent-indigo" />;
  if (cat.includes('framework') || cat.includes('library')) return <Layers className="w-5 h-5 text-accent-violet" />;
  if (cat.includes('tool') || cat.includes('devops')) return <Wrench className="w-5 h-5 text-text-secondary" />;
  return <Cpu className="w-5 h-5 text-accent-indigo" />;
}

export function SkillsSection({ data }: SkillsSectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="skills" className="py-24 bg-[#050508] relative border-t border-white/[0.06] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <SectionLabel number="003" label="TECH STACK & CAPABILITIES" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3">
              Tools & Technologies
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md">
            The modern frameworks, languages, and AI tools I leverage to build scalable, production-grade applications.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((skillCategory: any, idx: number) => {
            const isFeatured = idx === 0 || skillCategory.category?.toLowerCase().includes('ai');
            const cardSpan = isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1";

            return (
              <div
                key={idx}
                className={`group relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${cardSpan}`}
              >
                {/* Top highlight corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-tr-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-3.5 border-b border-white/[0.07] pb-4 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-indigo-400 shadow-inner group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
                      {getCategoryIcon(skillCategory.category)}
                    </div>
                    <div>
                      <h3 className="font-mono text-white uppercase text-xs sm:text-sm tracking-wider font-semibold">
                        {skillCategory.category}
                      </h3>
                      {isFeatured && (
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                          Core Specialization
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {skillCategory.items?.map((item: string, itemIdx: number) => (
                      <span
                        key={itemIdx}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm font-mono text-xs text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/[0.04]">
                  <span>{skillCategory.items?.length || 0} Technologies</span>
                  <span className="opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity">Active Stack →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
