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
  return (
    <section id="skills" className="py-section bg-bg-surface1 relative border-t border-border-default">
      <div className="max-w-container mx-auto px-6">
        <div className="mb-12">
          <SectionLabel number="003" label="TECH STACK" />
          <h2 className="text-h2 font-display text-text-primary mt-4">
            Tools & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((skillCategory: any, idx: number) => (
            <Card key={idx} className="flex flex-col gap-5 p-6 h-full">
              <div className="flex items-center gap-3 border-b border-border-default pb-4">
                {getCategoryIcon(skillCategory.category)}
                <h3 className="font-mono text-text-primary uppercase text-sm tracking-wider font-semibold">
                  {skillCategory.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {skillCategory.items?.map((item: string, itemIdx: number) => (
                  <Badge key={itemIdx} variant={idx % 2 === 0 ? "indigo" : "cyan"}>{item}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
