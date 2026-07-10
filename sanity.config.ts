'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemas'
import { StudioLogo } from './src/sanity/studio/logo'
import { structure } from './src/sanity/studio/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
  ],
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
})
