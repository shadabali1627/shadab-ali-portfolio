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
    <section id="about" className="py-24 bg-[#050508] relative border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12">
          <SectionLabel number="002" label="ABOUT ME" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3">
            {profile?.tagline || "Bridging the gap between AI research and production."}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Bio */}
          <div className="md:col-span-7 flex flex-col gap-5 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              {profile?.bio || "I am a software engineer specializing in artificial intelligence, full-stack systems, and distributed architecture."}
            </p>
            {profile?.longBio && (
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {profile.longBio}
              </p>
            )}
            {profile?.location && (
              <div className="inline-flex items-center gap-2 mt-2 font-mono text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Based in {profile.location}</span>
              </div>
            )}
          </div>
          
          {/* Quick Bento Signals */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 shadow-sm hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-300">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Currently Building
              </div>
              <p className="text-white text-sm sm:text-base font-medium leading-snug">
                {profile?.currentlyBuilding || "A new way to interact with multi-modal AI agents."}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 shadow-sm hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Currently Reading / Researching
              </div>
              <p className="text-white text-sm sm:text-base font-medium leading-snug">
                {profile?.currentlyReading || '"The Alignment Problem" by Brian Christian.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
