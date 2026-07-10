import { Rule } from 'sanity';

export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline shown under name e.g. Senior AI Engineer'
    },
    {
      name: 'profileImage',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,   // enables focal point selection in Studio
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }
      ],
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Shown in hero section below heading'
    },
    {
      name: 'longBio',
      title: 'Full Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full bio shown in About section (rich text)'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. San Francisco, CA / Remote'
    },
    {
      name: 'availableForWork',
      title: 'Available For Work',
      type: 'boolean',
      initialValue: true,
      description: 'Controls the green Available badge in navbar'
    },
    {
      name: 'currentlyBuilding',
      title: 'Currently Building',
      type: 'string',
      description: 'Shown on about card e.g. AI Agent Framework'
    },
    {
      name: 'currentlyReading',
      title: 'Currently Reading',
      type: 'string',
      description: 'Shown on about card e.g. Attention Is All You Need'
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string',
              options: { list: [
                'GitHub', 'LinkedIn', 'Twitter', 'HuggingFace',
                'GoogleScholar', 'Email', 'Website'
              ]}
            },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: { title: 'name', media: 'profileImage' }
  }
}
