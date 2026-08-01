import { defineConfig, fontProviders } from 'astro/config'

import solidJs from '@astrojs/solid-js'
import compress from '@playform/compress'
import { unified } from '@astrojs/markdown-remark'

import remarkBreaks from 'remark-breaks'

import { preserveImageSourcePath } from './src/core/image/preserve_source_path'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tepbyte.dev',
  trailingSlash: 'never',

  build: {
    assets: '_',
  },

  vite: {
    plugins: [preserveImageSourcePath()],
  },

  integrations: [
    solidJs(),
    compress({
      CSS: { csso: false },
    }),
  ],

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
