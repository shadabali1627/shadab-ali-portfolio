import React from 'react';
import { SectionLabel } from '@/components/ui';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  data?: any;
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  if (!data || data.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-[#030305] relative border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-14 text-center flex flex-col items-center">
          <SectionLabel label="TESTIMONIALS" className="mb-3" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mt-3 max-w-2xl">
            What collaborators say about working together.
          </h2>
          <p className="mt-2 text-slate-400 text-base md:text-lg max-w-xl">
            Feedback from engineers, founders, and technical leaders on production deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((testimonial: any, idx: number) => (
            <div 
              key={idx} 
              className="group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] hover:-translate-y-1 transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-indigo-400/20 mb-4 group-hover:text-indigo-400/40 transition-colors" />

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-bold text-indigo-300">
                  {testimonial.authorImageUrl ? (
                    <img src={testimonial.authorImageUrl} alt={testimonial.author} className="w-full h-full object-cover" />
                  ) : (
                    <span>{testimonial.author ? testimonial.author.charAt(0).toUpperCase() : 'C'}</span>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-white font-semibold text-sm truncate">{testimonial.author}</span>
                  <span className="text-slate-400 text-xs font-mono truncate">
                    {testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
