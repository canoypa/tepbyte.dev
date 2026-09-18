import { readFile } from 'node:fs/promises'
import { blurDataUrlFromImage } from '../blurhash'

const cache = new Map<string, Promise<string>>()

/**
 * 元画像のファイルからぼかしの data URL を作る。
 *
 * vite プラグインと rehype プラグインは同じ画像に別の経路で行き着くため、
 * 同じファイルを二度読まないよう、このキャッシュを両者で共有する。
 */
export const blurDataUrlFromFile = (path: string): Promise<string> => {
  const cached = cache.get(path)
  if (cached) return cached

  const task = readFile(path).then(blurDataUrlFromImage)
  cache.set(path, task)

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
