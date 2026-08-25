import { defineConfig, fontProviders } from 'astro/config'

import solidJs from '@astrojs/solid-js'
import compress from '@playform/compress'
import { unified } from '@astrojs/markdown-remark'

import remarkBreaks from 'remark-breaks'

import { rehypeBlurDataUrl } from './src/core/image/blur_rehype_plugin'
import { blurDataUrlPlugin } from './src/core/image/blur_vite_plugin'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tepbyte.dev',
  trailingSlash: 'never',

  build: {
    assets: '_',
  },

  integrations: [
    solidJs(),
    compress({
      CSS: { csso: false },
    }),
  ],

  vite: {
    plugins: [blurDataUrlPlugin()],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkBreaks],
      rehypePlugins: [rehypeBlurDataUrl],

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
