import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import remarkBreaks from 'remark-breaks'

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  markdown: {
    remarkPlugins: [remarkBreaks],

    remarkRehype: {
      footnoteLabelProperties: {
        ariaHidden: true,
        hidden: true,
      },
    },

    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
})
