import { readFile, writeFile } from 'node:fs/promises'

const readJson = async (file: URL): Promise<unknown> => {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch (error) {
    // 取得元を足した直後はまだ無い
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
    throw error
  }
}

/**
 * 内容が変わったときだけ書き出す。取得のたびに変わるが中身ではない値は、
 * `comparable` で外してから比べる。
 */
export const writeJsonIfChanged = async <T>(
  file: URL,
  data: T,
  comparable: (data: T) => unknown = (data) => data,
) => {
  const previous = await readJson(file)
  if (
    previous !== undefined &&
    JSON.stringify(comparable(previous as T)) ===
      JSON.stringify(comparable(data))
  ) {
    return
  }
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`)
}
