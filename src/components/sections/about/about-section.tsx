// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';
import { SectionLabel, Card } from '@/components/ui';

interface AboutSectionProps {
  data?: any; // For backward compatibility if needed
  profile?: any;
}

export function AboutSection({ data, profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-section bg-bg-page relative border-t border-border-default">
      <div className="max-w-container mx-auto px-6">
        <div className="mb-12">
          <SectionLabel number="002" label="ABOUT ME" />
          <h2 className="text-h2 font-display text-text-primary mt-4">
            {/* TODO: fetch from Sanity CMS */}
            Bridging the gap between AI research and production.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <div className="prose prose-invert max-w-none text-text-secondary text-body-lg flex flex-col justify-center">
            <p>
              {profile?.bio || "I am a software engineer specializing in artificial intelligence and large-scale distributed systems."}
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <Card>
              <h3 className="text-h4 font-display text-text-primary mb-2">Currently Building</h3>
              {/* TODO: fetch from Sanity CMS */}
              <p className="text-text-secondary text-sm">A new way to interact with multi-modal AI agents.</p>
            </Card>
            <Card>
              <h3 className="text-h4 font-display text-text-primary mb-2">Currently Reading</h3>
              {/* TODO: fetch from Sanity CMS */}
              <p className="text-text-secondary text-sm">"The Alignment Problem" by Brian Christian.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
