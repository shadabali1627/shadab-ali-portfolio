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
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to order the skill sections on the website (lower numbers appear first)',
    }),
  ],
  preview: {
    select: {
      title: 'category',
      subtitle: 'order',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Order: ${subtitle}` : 'Order: Not set',
      }
    }
  }
})
