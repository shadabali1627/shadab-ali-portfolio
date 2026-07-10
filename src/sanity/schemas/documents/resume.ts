import { Rule } from 'sanity';

export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Resume & Credentials',
    },
    {
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'Download my full resume or view credentials below'
    },
    {
      name: 'enableResumeUpload',
      title: 'Enable Resume Upload',
      type: 'boolean',
      initialValue: true,
      description: 'Turn this on to upload a downloadable resume PDF.'
    },
    {
      name: 'resumeFile',
      title: 'Resume PDF File',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload your resume PDF here. This powers the download button.',
      hidden: ({ document }: any) => !document?.enableResumeUpload,
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        if (context.document?.enableResumeUpload && !value) {
          return 'Resume PDF is required when Enable Resume Upload is true';
        }
        return true;
      })
    },
    {
      name: 'resumeVersion',
      title: 'Resume Version Label',
      type: 'string',
      description: 'e.g. "Updated June 2026" shown next to download button',
      hidden: ({ document }: any) => !document?.enableResumeUpload,
    },
    {
      name: 'showResumeSection',
      title: 'Show Resume Section on Site',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide the entire resume section'
    },
    {
      name: 'credentials',
      title: 'Credentials & Certifications',
      type: 'array',
      description: 'Add degrees, certifications, courses',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: { list: [
                'Degree', 'Certification', 'Course',
                'Bootcamp', 'Award', 'Publication'
              ]}
            },
            { name: 'title',       title: 'Title',        type: 'string' },
            { name: 'institution', title: 'Institution',  type: 'string' },
            { name: 'year',        title: 'Year',         type: 'string' },
            { name: 'url',         title: 'Verify URL',   type: 'url',
              description: 'Link to certificate or credential page' },
            {
              name: 'badgeImage',
              title: 'Badge/Logo Image',
              type: 'image',
              options: { hotspot: true }
            }
          ],
          preview: {
            select: { title: 'title', subtitle: 'institution' }
          }
        }
      ]
    },
    {
      name: 'stats',
      title: 'Key Stats',
      type: 'array',
      description: 'Highlight numbers shown in the resume section',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string',
              description: 'e.g. 50+ or 5 Years' },
            { name: 'label', title: 'Label', type: 'string',
              description: 'e.g. Models Deployed' },
            { name: 'icon',  title: 'Icon Name', type: 'string',
              description: 'Lucide icon name e.g. brain, code, zap' }
          ]
        }
      ]
    }
  ],
  preview: {
    select: { title: 'title' }
  }
}
