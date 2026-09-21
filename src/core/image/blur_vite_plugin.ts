import type { Plugin } from 'vite'
import { blurDataUrlFromFile, RASTER_IMAGE } from './blur'

/**
 * コンテンツコレクションの画像インポートに付くクエリ。
 * Astro 内部の CONTENT_IMAGE_FLAG（astro/dist/content/consts.js）と同じ値。
 */
const CONTENT_IMAGE_FLAG = 'astroContentImageFlag'

/**
 * astro:assets:esm が出力するモジュールの先頭。
 * サーバでは `export default new Proxy({...}, {...})`、クライアントでは `export default {...}`
 * （astro/dist/assets/vite-plugin-assets.js）。
 */
const ASTRO_IMAGE_MODULE = /^export default\s+(\{|new Proxy\()/

const BINDING = '__imageWithBlurDataUrl'

/** transform を呼ぶ前の絞り込み。クエリ付きの id も通すため、末尾一致にしない */
const RASTER_IMAGE_ID = /\.(apng|avif|gif|jpeg|jpg|png|tiff|webp)($|\?)/i

/** これ以外のクエリ付きインポート（`?url` など）は ImageMetadata ではなく URL 文字列になる */
const isImageMetadataImport = (path: string, query: string | undefined) =>
  RASTER_IMAGE.test(path) &&
  (query === undefined || query.includes(CONTENT_IMAGE_FLAG))

/**
 * astro:assets の画像モジュールに、元画像から作ったぼかしの data URL を `blurDataUrl` として焼き込む。
 *
 * 実プロパティとして持たせるのは、Proxy の clone（structuredClone）やコンテンツコレクションを
 * 通っても値を落とさないため。
 * Astro の出力の形が想定と違うときは、ビルドは止めずに警告して素通しする。
 */
export const blurDataUrlPlugin = (): Plugin => ({
  name: 'blur-data-url',
  enforce: 'post',

  transform: {
    // ここで絞ると、画像以外のモジュールでは handler 自体が呼ばれない
    filter: { id: RASTER_IMAGE_ID },

    async handler(code, id) {
      const [path, query] = id.split('?')

      if (!isImageMetadataImport(path, query)) return

      if (!ASTRO_IMAGE_MODULE.test(code)) {
        this.warn(
          `Astro の画像モジュールの形が想定と違うため、ぼかしを付けられません: ${path}`,
        )
        return
      }

      const blurDataUrl = await blurDataUrlFromFile(path)

      return {
        code: [
          code.replace(/^export default/, `const ${BINDING} =`),
          `${BINDING}.blurDataUrl = ${JSON.stringify(blurDataUrl)};`,
          `export default ${BINDING};`,
        ].join('\n'),
        map: null,
      }
    },
  },
})
