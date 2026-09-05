import { groq } from 'next-sanity';

export const getSiteSettings = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logoText,
    contactEmail,
    socialLinks
  }
`;

export const getHeroData = groq`
  *[_type == "hero"][0] {
    heading,
    subheading,
    terminalModules,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink
  }
`;

export const getAllProjects = groq`
  *[_type == "project"] | order(publishedAt desc) {
    title,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    url,
    repository,
    tags
  }
`;

export const getFeaturedProjects = groq`*[_type == "project" && featured == true] | order(publishedAt desc)`;
export const getProjectBySlug = groq`*[_type == "project" && slug.current == $slug][0]`;
export const getAllBlogPosts = groq`*[_type == "blogPost"] | order(publishedAt desc)`;
export const getBlogPostBySlug = groq`*[_type == "blogPost" && slug.current == $slug][0]`;

export const getAllExperience = groq`
  *[_type == "experience"] | order(startDate desc) {
    role,
    company,
    companyUrl,
    "companyLogoUrl": companyLogo.asset->url,
    startDate,
    endDate,
    current,
    description,
    technologies
  }
`;

export const getAllSkills = groq`
  *[_type == "skill"] | order(order asc) {
    category,
    items
  }
`;

export const getAllTestimonials = groq`
  *[_type == "testimonial"] {
    author,
    role,
    company,
    "authorImageUrl": authorImage.asset->url,
    content
  }
`;

export const getContactQuery = groq`
  *[_type == "contact"][0] {
    email,
    phone,
    location,
    availability
  }
`;

export const getGalleryData = groq`
  *[_type == "gallery"] | order(_createdAt asc) {
    title,
    images[] {
      "url": asset->url,
      alt,
      caption
    }
  }
`;

export const getProfileQuery = groq`
  *[_type == "profile"][0] {
    name,
    tagline,
    profileImage {
      asset,
      alt,
      hotspot
    },
    bio,
    longBio,
    location,
    availableForWork,
    currentlyBuilding,
    currentlyReading,
    socialLinks
  }
`;

export const getResumeQuery = groq`
  *[_type == "resume"][0] {
    title,
    subtitle,
    showResumeSection,
    resumeVersion,
    "resumeFileUrl": resumeFile.asset->url,
    stats[] {
      value,
      label,
      icon
    },
    credentials[] {
      type,
      title,
      institution,
      year,
      url,
      badgeImage {
        asset,
        alt
      }
    }
  }
`;
