import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category Name',
      type: 'string',
      description: 'e.g., Languages, Frameworks, Developer Tools',
    }),
    defineField({
      name: 'items',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of skills in this category',
    }),
  ],
})
