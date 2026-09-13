import { defineConfig, fontProviders } from 'astro/config'

import solidJs from '@astrojs/solid-js'
import { unified } from '@astrojs/markdown-remark'

import remarkBreaks from 'remark-breaks'

// https://astro.build/config
export default defineConfig({
  site: 'https://tepbyte.dev',
  trailingSlash: 'never',

  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },

  integrations: [solidJs()],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkBreaks],

      remarkRehype: {
        footnoteLabelProperties: {
          ariaHidden: true,
          hidden: true,
        },
      },
    }),

    shikiConfig: {
      theme: 'github-dark-default',
    },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Comfortaa',
      cssVariable: '--font-comfortaa',
      fallbacks: [],
    },
    {
      provider: fontProviders.google(),
      name: 'Kosugi Maru',
      cssVariable: '--font-kosugi-maru',
      fallbacks: [],
    },
  ],
})
