import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Address',
      type: 'string',
    }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      description: 'e.g., Currently open to new opportunities',
    }),
  ],
})
