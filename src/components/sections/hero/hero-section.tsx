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
  const terminalModules = heroData?.terminalModules || ["AI", "Web3", "Scale"];
  const socialLinks = profile?.socialLinks || [];

  return (
    <section className="relative min-h-screen bg-[#050508] flex items-center overflow-hidden pt-16">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none" />



      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center w-full mt-10">
        {/* Left column */}
        <div className="col-span-1 md:col-span-7 flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-medium text-[#06b6d4]">
              Hi, I'm {profile?.name || "there"} 👋
            </h2>
            <h1 className="text-display font-black text-white">
              {heading}
            </h1>
          </div>
          <p className="text-base md:text-lg text-[#94a3b8] leading-[1.7] max-w-lg">
            {subheading}
          </p>
          
          <div className="mt-4">
            <HeroCtaRow 
              resumeUrl={resumeData?.resumeFileUrl} 
              resumeVersion={resumeData?.resumeVersion} 
              primaryCtaText={heroData?.primaryCtaText}
              primaryCtaLink={heroData?.primaryCtaLink}
              secondaryCtaText={heroData?.secondaryCtaText}
              secondaryCtaLink={heroData?.secondaryCtaLink}
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            {/* Social Icons */}
            {socialLinks.map((link: any, idx: number) => {
              const platform = link.platform?.toLowerCase();
              return (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="p-2 text-[#94a3b8] hover:text-white transition-colors">
                  {platform === 'github' && <Github className="w-5 h-5" />}
                  {platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                  {!['github', 'linkedin', 'twitter'].includes(platform) && <span>{link.platform}</span>}
                </a>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-4 mt-8 md:mt-0 relative justify-center items-center">
          {profile?.profileImage && (
            <ProfileImage 
              image={profile.profileImage} 
              name={profile.name || "Profile"} 
              availableForWork={profile.availableForWork} 
            />
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
        <span className="text-[10px] text-[#94a3b8] font-mono tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
}
