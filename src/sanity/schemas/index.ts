import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './documents/project'
import { experienceType } from './documents/experience'
import { testimonialType } from './documents/testimonial'
import profile from './documents/profile'
import resume from './documents/resume'
import hero from './documents/hero'
import siteSettings from './documents/site-settings'
import gallery from './documents/gallery'
import skill from './documents/skill'
import contact from './documents/contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType, 
    experienceType, 
    testimonialType, 
    profile, 
    resume,
    hero,
    siteSettings,
    gallery,
    skill,
    contact
  ],
}
