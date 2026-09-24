import { defineConfig, fontProviders } from 'astro/config'

import mdx from '@astrojs/mdx'
import solidJs from '@astrojs/solid-js'
import { unified } from '@astrojs/markdown-remark'

import remarkBreaks from 'remark-breaks'

// https://astro.build/config
export default defineConfig({
  site: 'https://tepbyte.dev',
  trailingSlash: 'never',

  image: {
    layout: 'constrained',
    responsiveStyles: false,
    // 既定値と同じ。写真の srcset も同じ候補を使うので、imageConfig から読めるように明示する
    breakpoints: [640, 750, 828, 1080, 1280, 1668, 2048, 2560],
  },

  integrations: [solidJs(), mdx()],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkBreaks],

      remarkRehype: {
        footnoteLabel: '脚注',
        footnoteLabelProperties: {
          hidden: true,
        },
        footnoteBackLabel: (referenceIndex, rereferenceIndex) =>
          `参照元 ${referenceIndex + 1}${rereferenceIndex > 1 ? `-${rereferenceIndex}` : ''} に戻る`,
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
