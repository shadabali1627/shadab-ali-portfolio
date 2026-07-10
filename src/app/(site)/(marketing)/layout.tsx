import { Navbar } from "@/components/layout/navbar/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getSiteSettings, getResumeQuery, getProfileQuery } from "@/sanity/lib/queries";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) { 
  const settings = await sanityFetch<any>({ query: getSiteSettings, tags: ['siteSettings'] });
  const resumeData = await sanityFetch<any>({ query: getResumeQuery, tags: ['resume'] });
  const profile = await sanityFetch<any>({ query: getProfileQuery, tags: ['profile'] });

  return (
    <>
      <Navbar settings={settings} resumeData={resumeData} profile={profile} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
