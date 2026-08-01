import { defineConfig, fontProviders } from 'astro/config'

import cloudflare from '@astrojs/cloudflare'
import solidJs from '@astrojs/solid-js'
import compress from '@playform/compress'
import { unified } from '@astrojs/markdown-remark'

import remarkBreaks from 'remark-breaks'

import { preserveImageSourcePath } from './src/core/image/preserve_source_path'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tepbyte.dev',
  trailingSlash: 'never',

  // 既定は静的。`export const prerender = false` を書いたルートだけ Worker で動く。
  // ページを SSR にすると sharp / node:fs を使う画像処理が Worker に載って壊れるため、
  // 動的にするのはデータ用のエンドポイントに限る。
  output: 'static',
  adapter: cloudflare({
    // 既定の 'workerd' はプリレンダーまで Workers ランタイムで実行するため、
    // sharp / node:fs に依存する画像処理（core/blurhash.ts）が解決できず失敗する。
    // 静的ページの生成は Node で行う。
    prerenderEnvironment: 'node',
  }),

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
