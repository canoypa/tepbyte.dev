import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { blurDataUrlFromImage } from '../blurhash'

/** astro:assets が ImageMetadata として扱う形式のうち、sharp で読めるもの（svg を除く） */
export const RASTER_IMAGE = /\.(apng|avif|gif|jpeg|jpg|png|tiff|webp)$/i

const cache = new Map<string, Promise<string>>()

/**
 * 元画像のファイルからぼかしの data URL を作る。
 *
 * 同じ画像でもクエリの違うインポート（コンテンツコレクションの画像と本文の画像）は
 * 別々に transform されるため、同じファイルを二度読まないようキャッシュする。
 * dev では同じパスのまま中身が差し替わるので、更新時刻もキーに含める。
 */
export const blurDataUrlFromFile = async (path: string): Promise<string> => {
  // vite の id は Windows でも `/` 区切りなので、区切りをそろえてから引く
  const file = resolve(path)
  const { mtimeMs } = await stat(file)
  const key = `${file}:${mtimeMs}`

  const cached = cache.get(key)
  if (cached) return cached

  const task = readFile(file).then(blurDataUrlFromImage)
  cache.set(key, task)
  // 書き込み途中のファイルを読んだ失敗を、ファイルが揃ったあとも返し続けないように
  task.catch(() => cache.delete(key))

  return task
}

/**
 * 画像メタデータから、vite プラグインが焼き込んだぼかしの data URL を取り出す。
 * Astro の ImageMetadata 型にはないフィールドなので、実行時の形で確かめる。
 */
export const blurDataUrlOf = (src: unknown): string | undefined => {
  if (typeof src !== 'object' || src === null) return undefined

  const { blurDataUrl } = src as { blurDataUrl?: unknown }

  return typeof blurDataUrl === 'string' ? blurDataUrl : undefined
}
