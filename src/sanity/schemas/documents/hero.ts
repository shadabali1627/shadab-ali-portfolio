import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The main big text (e.g., "AI Engineer & Builder")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      description: 'The subtitle below the heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'terminalModules',
      title: 'Terminal Modules',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'The modules loaded in the terminal animation (e.g., "AI", "Web3")',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
      description: 'Text for the primary button',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
      description: 'Link for the primary button (e.g., "#projects")',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      description: 'Text for the secondary button',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
      description: 'Link for the secondary button',
    }),
  ],
})
