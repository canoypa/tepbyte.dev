import { readFile, writeFile } from 'node:fs/promises'

const readJson = async (file: URL): Promise<unknown> => {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
    throw error
  }
}

/** `comparable` は、取得のたびに変わるが中身ではない値を比較から外す */
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
