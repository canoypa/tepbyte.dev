import { readFile, writeFile } from 'node:fs/promises'
import type { z } from 'astro/zod'

const readJson = async (file: URL): Promise<unknown> => {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
    throw error
  }
}

export const writeJsonIfChanged = async <S extends z.ZodType>(
  file: URL,
  schema: S,
  data: z.infer<S>,
  comparable: (data: z.infer<S>) => unknown = (data) => data,
) => {
  const next = schema.parse(data)
  // 形が変わった前回の出力は、比べずに書き直す
  const previous = schema.safeParse(await readJson(file))
  if (
    previous.success &&
    JSON.stringify(comparable(previous.data)) ===
      JSON.stringify(comparable(next))
  ) {
    return
  }
  await writeFile(file, `${JSON.stringify(next, null, 2)}\n`)
}
