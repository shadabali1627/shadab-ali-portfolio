import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('project')     .title('Projects'),
      S.documentTypeListItem('experience')  .title('Experience'),
      S.documentTypeListItem('testimonial') .title('Testimonials'),
      S.documentTypeListItem('skill')       .title('Skills'),

      S.documentTypeListItem('gallery')     .title('Image Galleries'),
      S.divider(),
      // Singletons (only one document of each type):
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings-singleton')
        ),
      S.listItem()
        .title('Hero Section')
        .child(
          S.document()
            .schemaType('hero')
            .documentId('hero-singleton')
        ),
      S.listItem()
        .title('Profile & Photo')
        .child(
          S.document()
            .schemaType('profile')
            .documentId('profile-singleton')
        ),
      S.listItem()
        .title('Resume & Credentials')
        .child(
          S.document()
            .schemaType('resume')
            .documentId('resume-singleton')
        ),
      S.listItem()
        .title('Contact Info')
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact-singleton')
        ),
    ])
