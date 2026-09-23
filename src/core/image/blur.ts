import { readFile, stat } from 'node:fs/promises'
import { blurDataUrlFromImage } from '../blurhash'

const cache = new Map<string, Promise<string>>()

/** dev では同じパスのまま中身が差し替わるので、キャッシュのキーに更新時刻も含める */
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
