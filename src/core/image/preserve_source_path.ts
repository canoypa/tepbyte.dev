import type { Plugin } from 'vite'

/** Astro が ImageMetadata を生成する対象のうち、バイト列を読みたいもの。SVG は除く（Astro がコンポーネント化するため） */
const IMAGE_FILE = /\.(png|jpe?g|webp|avif|gif|tiff)$/

/**
 * 画像モジュールに元ファイルの絶対パスを実プロパティとして持たせる。
 *
 * Astro も同じ値を `fsPath` として持っているが、サーバ環境では Proxy の get トラップ
 * 経由でしか返さないため、コンテンツコレクションが content store に保存する時点で失われる。
 * 実プロパティとして定義し直すことで、シリアライズを越えて render まで残す。
 *
 * このプラグインは blurhash について何も知らない。単に Astro が失う情報を保持するだけで、
 * 元画像のバイト列を必要とする処理すべてがこれを土台にできる。
 */
export function preserveImageSourcePath(): Plugin {
  const EXPORT_DEFAULT = 'export default '

  return {
    name: 'tepbyte:preserve-image-source-path',
    // astro:assets:esm の load が返したコードを受け取る必要があるため後段で走らせる
    enforce: 'post',

    transform(code, id) {
      const fsPath = id.split('?')[0]
      if (!IMAGE_FILE.test(fsPath)) return null

      // astro:assets:esm は `export default <式>` の形しか返さない。
      // 想定外の形なら書き換えず素通しする。
      if (!code.startsWith(EXPORT_DEFAULT)) return null

      const metadata = code.slice(EXPORT_DEFAULT.length)

      return {
        code: [
          `const __image = (${metadata});`,
          `Object.defineProperty(__image, 'fsPath', {`,
          `  value: ${JSON.stringify(fsPath)},`,
          `  enumerable: true,`,
          `  configurable: true,`,
          `});`,
          `export default __image;`,
        ].join('\n'),
        map: null,
      }
    },
  }
}
