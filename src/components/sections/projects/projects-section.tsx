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
  return (
    <section id="projects" className="py-section bg-bg-page relative border-t border-border-default overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-accent-indigo/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <SectionLabel number="004" label="FEATURED WORK" />
            <h2 className="text-h2 font-display text-text-primary mt-4">
              Selected Projects
            </h2>
          </div>
          <Button variant="ghost" className="hidden md:flex">View all projects &rarr;</Button>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {data?.map((project: any, idx: number) => {
            const descriptionItems = parseBullets(project.description);

            return (
              <Card 
                key={idx} 
                className="flex flex-col md:flex-row gap-0 overflow-hidden p-0 relative group hover:-translate-y-1 hover:border-accent-indigo/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-300"
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 bg-bg-surface2 min-h-[200px] sm:min-h-[300px] md:min-h-[400px] relative overflow-hidden">
                  {project.imageUrl ? (
                    <>
                      <img src={project.imageUrl} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      {/* Subtle inner shadow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-surface1/80 md:to-bg-surface1/90 pointer-events-none" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-accent-indigo/10 flex items-center justify-center text-text-muted font-mono">
                      [No Image]
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-12 flex flex-col justify-center gap-6 bg-gradient-to-b from-transparent to-bg-surface2/50">
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag: string, tagIdx: number) => (
                      <Badge key={tagIdx} variant="indigo" className="group-hover:bg-accent-indigo/20 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="text-h3 font-display text-text-primary">{project.title}</h3>
                  
                  <div className="space-y-3">
                    {descriptionItems.map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 text-text-secondary">
                        <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                        <span className="leading-relaxed text-sm md:text-base">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3 md:gap-4">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2 group/demo">
                          View Demo
                          <ExternalLink className="w-4 h-4 group-hover/demo:-translate-y-0.5 group-hover/demo:translate-x-0.5 transition-transform" />
                        </Button>
                      </a>
                    )}
                    {project.repository && (
                      <a href={project.repository} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button variant="ghost" className="w-full sm:w-auto flex items-center justify-center gap-2 group/code">
                          Source Code
                          <Code2 className="w-4 h-4 group-hover/code:scale-110 transition-transform" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <Button variant="ghost" className="mt-12 flex w-full justify-center md:hidden">View all projects &rarr;</Button>
      </div>
    </section>
  );
}
