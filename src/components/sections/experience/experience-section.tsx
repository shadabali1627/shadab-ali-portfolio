// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';
import { SectionLabel, Card, Badge } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';

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

export function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-section bg-bg-page relative border-t border-border-default">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <SectionLabel label="CAREER" />
          <h2 className="text-h2 font-display text-text-primary mt-4">
            Experience Timeline
          </h2>
        </div>

        <div className="relative ml-4 md:ml-6 pl-6 md:pl-12 py-4 flex flex-col gap-12">
          {/* Gradient timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-accent-indigo via-accent-violet to-transparent opacity-50" />
          
          {data?.map((exp: any, idx: number) => {
            const parsedDesc = parseDescription(exp.description);
            const isPresent = exp.current;

            return (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className={`absolute -left-[31.5px] md:-left-[55.5px] top-6 h-4 w-4 rounded-full border-2 border-bg-page z-10 transition-colors duration-300 ${isPresent ? 'bg-accent-indigo shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-pulse' : 'bg-text-muted group-hover:bg-accent-violet group-hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]'}`} />
                
                <Card className="p-5 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-display text-text-primary mb-2">{exp.role}</h3>
                      <div className="flex items-center gap-3">
                        {exp.companyLogoUrl && (
                          <img src={exp.companyLogoUrl} alt={exp.company} className="h-7 w-auto rounded object-contain bg-white/5 p-1" />
                        )}
                        <h4 className="text-lg text-text-secondary font-medium">{exp.company}</h4>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-accent-indigo bg-accent-indigo/10 px-3 py-1 rounded-full border border-accent-indigo/20 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {isPresent ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>

                  {parsedDesc.length > 0 && (
                    <ul className="flex flex-col gap-3 mb-8">
                      {parsedDesc.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 text-accent-cyan shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 border-t border-border-default pt-6">
                      {exp.technologies.map((tech: string, techIdx: number) => (
                        <Badge key={techIdx} variant={techIdx % 2 === 0 ? "indigo" : "violet"}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
