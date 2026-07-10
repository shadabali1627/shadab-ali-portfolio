// STITCH PROJECT: 4229877773298364915
// MCP SYNC: PENDING — scaffold generated from spec
// Re-run import prompt after MCP connection is restored

import React from 'react';
import { SectionLabel, Card, Avatar } from '@/components/ui';

interface TestimonialsSectionProps {
  data?: any; // TODO: fetch from Sanity CMS
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-section bg-bg-page relative border-t border-border-default">
      <div className="max-w-container mx-auto px-6">
        <div className="mb-12 text-center flex flex-col items-center">
          <SectionLabel number="008" label="TESTIMONIALS" />
          <h2 className="text-h2 font-display text-text-primary mt-4 max-w-2xl">
            What people say about working with me.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {data?.map((testimonial: any, idx: number) => (
            <Card key={idx} className="flex flex-col gap-6">
              <p className="text-text-secondary italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-10 w-10 bg-bg-surface2 rounded-full overflow-hidden">
                  {testimonial.authorImageUrl && (
                    <img src={testimonial.authorImageUrl} alt={testimonial.author} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-text-primary font-medium text-sm">{testimonial.author}</span>
                  <span className="text-text-muted text-xs">{testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
