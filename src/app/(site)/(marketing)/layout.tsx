import { Navbar } from "@/components/layout/navbar/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getSiteSettings, getResumeQuery, getProfileQuery } from "@/sanity/lib/queries";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) { 
  const settings = await sanityFetch<any>({ query: getSiteSettings, tags: ['siteSettings'] });
  const resumeData = await sanityFetch<any>({ query: getResumeQuery, tags: ['resume'] });
  const profile = await sanityFetch<any>({ query: getProfileQuery, tags: ['profile'] });

  return (
    <div className="relative min-h-screen bg-[#030305] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Analog tactile grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] bg-grain opacity-[0.03] mix-blend-overlay" />
      <Navbar settings={settings} resumeData={resumeData} profile={profile} />
      <main className="relative z-10">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
