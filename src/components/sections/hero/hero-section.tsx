import React from 'react';
import { HeroCtaRow } from './hero-cta-row';
import { ProfileImage } from '../about/profile-image';

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

interface HeroSectionProps {
  heroData?: any;
  resumeData?: any; 
  profile?: any;
}

export function HeroSection({ heroData, resumeData, profile }: HeroSectionProps) {
  const heading = heroData?.heading || "AI Engineer & Builder";
  const subheading = heroData?.subheading || "Building frontier technologies and intelligent systems.";
  const socialLinks = profile?.socialLinks || [];

  return (
    <section className="relative min-h-[92vh] bg-[#050508] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Dynamic ambient mesh gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 w-full">
        {/* Bento Hero Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
          {/* Left Hero Card / Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-300">
                Hi, I'm <span className="text-cyan-400 font-semibold">{profile?.name || "Shadab"}</span> 👋
              </span>
            </div>

            {/* Display Headline with typography hierarchy */}
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                <span className="block">{heading.split('&')[0]}</span>
                {heading.includes('&') && (
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                    & {heading.split('&')[1]}
                  </span>
                )}
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl font-normal">
              {subheading}
            </p>
            
            {/* Call to Action Row */}
            <div className="mt-2 w-full">
              <HeroCtaRow 
                resumeUrl={resumeData?.resumeFileUrl} 
                resumeVersion={resumeData?.resumeVersion} 
                primaryCtaText={heroData?.primaryCtaText}
                primaryCtaLink={heroData?.primaryCtaLink}
                secondaryCtaText={heroData?.secondaryCtaText}
                secondaryCtaLink={heroData?.secondaryCtaLink}
              />
            </div>

            {/* Frosted Glass Social Pills */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2.5 mt-2 flex-wrap justify-center lg:justify-start">
                <span className="text-xs font-mono text-slate-500 mr-1 uppercase tracking-wider">Connect:</span>
                {socialLinks.map((link: any, idx: number) => {
                  const platform = link.platform?.toLowerCase();
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:scale-105 transition-all duration-200 text-xs font-mono"
                    >
                      {platform === 'github' && <Github className="w-3.5 h-3.5" />}
                      {platform === 'linkedin' && <Linkedin className="w-3.5 h-3.5" />}
                      {platform === 'twitter' && <Twitter className="w-3.5 h-3.5" />}
                      <span>{link.platform}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Bento Showcase Frame */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {profile?.profileImage && (
              <ProfileImage 
                image={profile.profileImage} 
                name={profile.name || "Profile"} 
                availableForWork={profile.availableForWork} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Modern subtle scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-indigo-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
