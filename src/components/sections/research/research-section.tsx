// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';
import { SectionLabel, Card } from '@/components/ui';

interface ResearchSectionProps {
  data?: any; // TODO: fetch from Sanity CMS
}

export function ResearchSection({ data }: ResearchSectionProps) {
  return (
    <section id="research" className="py-section bg-bg-surface1 relative border-t border-border-default">
      <div className="max-w-container mx-auto px-6">
        <div className="mb-12">
          <SectionLabel number="005" label="PUBLICATIONS" />
          <h2 className="text-h2 font-display text-text-primary mt-4">
            Research & Papers
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {data?.map((research: any, idx: number) => (
            <Card key={idx} className="hover:border-accent-cyan flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-text-primary font-medium text-lg">{research.title}</h3>
                <p className="text-text-secondary text-sm mt-1">{research.venue}, {new Date(research.date).getFullYear()}</p>
                {research.authors && (
                  <p className="text-text-muted text-xs mt-2">{research.authors.join(', ')}</p>
                )}
              </div>
              {research.link && (
                <a href={research.link} target="_blank" rel="noopener noreferrer" className="text-accent-cyan hover:underline font-mono text-sm whitespace-nowrap">
                  Read Paper &rarr;
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
