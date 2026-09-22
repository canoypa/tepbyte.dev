import { readFile, stat } from 'node:fs/promises'
import { blurDataUrlFromImage } from '../blurhash'

/** astro:assets が ImageMetadata として扱う形式のうち、sharp で読めるもの（svg を除く） */
export const RASTER_IMAGE = /\.(apng|avif|gif|jpeg|jpg|png|tiff|webp)$/i

const cache = new Map<string, Promise<string>>()

/**
 * 元画像のファイルからぼかしの data URL を作る。
 *
 * 同じ画像は何か所でも描かれる（カバー画像をフロントマターと本文の両方で使うなど）ので、
 * 同じファイルを二度読まないようキャッシュする。
 * dev では同じパスのまま中身が差し替わるので、更新時刻もキーに含める。
 */
export const blurDataUrlFromFile = async (path: string): Promise<string> => {
  const { mtimeMs } = await stat(path)
  const key = `${path}:${mtimeMs}`

  const cached = cache.get(key)
  if (cached) return cached

  const task = readFile(path).then(blurDataUrlFromImage)
  cache.set(key, task)
  // 書き込み途中のファイルを読んだ失敗を、ファイルが揃ったあとも返し続けないように
  task.catch(() => cache.delete(key))

  return task
}
