import { HeroSection } from "@/components/sections/hero/hero-section";
import { AboutSection } from "@/components/sections/about/about-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";
import { ProjectsSection } from "@/components/sections/projects/projects-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { ResumeSection } from "@/components/sections/resume/resume-section";
import { sanityFetch } from '@/sanity/lib/fetch';
import { 
  getProfileQuery, 
  getResumeQuery,
  getHeroData,
  getAllProjects,
  getAllExperience,
  getAllSkills,
  getAllTestimonials,
  getGalleryData,
  getContactQuery
} from '@/sanity/lib/queries';
import { TestimonialsSection } from "@/components/sections/testimonials/testimonials-section";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { ImageGallerySection } from "@/components/sections/gallery/image-gallery-section";

export default async function HomePage() { 
  const [profile, resume, hero, projects, experience, skills, testimonials, gallery, contact] = await Promise.all([
    sanityFetch<any>({ query: getProfileQuery, tags: ['profile'] }),
    sanityFetch<any>({ query: getResumeQuery, tags: ['resume'] }),
    sanityFetch<any>({ query: getHeroData, tags: ['hero'] }),
    sanityFetch<any>({ query: getAllProjects, tags: ['project'] }),
    sanityFetch<any>({ query: getAllExperience, tags: ['experience'] }),
    sanityFetch<any>({ query: getAllSkills, tags: ['skill'] }),
    sanityFetch<any>({ query: getAllTestimonials, tags: ['testimonial'] }),
    sanityFetch<any>({ query: getGalleryData, tags: ['gallery'] }),
    sanityFetch<any>({ query: getContactQuery, tags: ['contact'] })
  ]);

  return (
    <>
      <HeroSection heroData={hero} resumeData={resume} profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection data={skills} />
      <ProjectsSection data={projects} />
      <ExperienceSection data={experience} />
      {resume?.showResumeSection && (
        <ResumeSection data={resume} />
      )}
      <ImageGallerySection data={gallery} />
      <TestimonialsSection data={testimonials} />
      <ContactSection data={contact} profile={profile} />
    </>
  ); 
}
