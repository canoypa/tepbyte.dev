import { defineConfig, fontProviders } from 'astro/config'

import solidJs from '@astrojs/solid-js'
import compress from '@playform/compress'

import remarkBreaks from 'remark-breaks'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tepbyte.dev',
  trailingSlash: 'never',

  build: {
    assets: '_',
  },

  integrations: [solidJs(), compress()],

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

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Comfortaa',
        cssVariable: '--font-comfortaa',
      },
    ],
  },
})
