import type { Plugin } from 'vite'
import { blurDataUrlFromFile } from './blur'

/** astro:assets が扱う形式のうち、sharp でラスタとして読めるもの（svg を除く） */
const RASTER_IMAGE = /\.(avif|gif|jpeg|jpg|png|tiff|webp)$/i

/**
 * コンテンツコレクション経由の画像インポートに付くクエリ。
 * Astro 内部の CONTENT_IMAGE_FLAG（astro/dist/content/consts.js）と同じ値。
 */
const CONTENT_IMAGE_FLAG = 'astroContentImageFlag'

/**
 * astro:assets:esm が出力するモジュールの形。
 *
 * サーバ環境では `export default new Proxy({...}, {...})`、クライアント環境では
 * `export default {...}` になる（astro/dist/assets/vite-plugin-assets.js）。
 */
const ASTRO_IMAGE_MODULE = /^export default\s+(\{|new Proxy\()/

const BINDING = '__imageWithBlurDataUrl'

/** Astro が ImageMetadata を出力するインポートかどうか。それ以外はただの URL 文字列になる */
const isImageMetadataImport = (path: string, query?: string) =>
  RASTER_IMAGE.test(path) &&
  (query === undefined || query.includes(CONTENT_IMAGE_FLAG))

/**
 * astro:assets の画像モジュールに `blurDataUrl` を焼き込む vite プラグイン。
 *
 * blur プレースホルダは元画像から一意に決まる値なので、レンダリング時ではなく
 * モジュール解決時に一度だけ計算する。実プロパティとして持たせることで、
 * コンテンツコレクションの JSON store を通っても値が落ちない。
 *
 * Astro の出力形が変わったときは、ビルドを壊さず警告だけ出して素通しする。
 * blur が黙って消えるのが一番まずいので、気づける形にしておく。
 */
export const blurDataUrlPlugin = (): Plugin => ({
  name: 'blur-data-url',
  enforce: 'post',

  async transform(code, id) {
    const [path, query] = id.split('?')

    if (!isImageMetadataImport(path, query)) return

    if (!ASTRO_IMAGE_MODULE.test(code)) {
      this.warn(
        `Astro の画像モジュールの形が変わったため blurDataUrl を付与できません: ${path}`,
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
})
