import { readFile } from 'node:fs/promises'
import { decode, encode } from 'blurhash'
import sharp from 'sharp'

/** blurhash に落とし込む前に元画像を縮小するサイズ */
const ENCODE_SIZE = 4
/** blurhash から復元する data URL のサイズ */
const DECODE_SIZE = 8
/** blurhash の成分数（X/Y 共通） */
const COMPONENTS = 3

/** blurhash 文字列を、そのまま background-image に置ける data URL にする */
export const blurhashToDataUrl = async (blurhash: string): Promise<string> => {
  const pixels = decode(blurhash, DECODE_SIZE, DECODE_SIZE)

  const webp = await sharp(Buffer.from(pixels), {
    raw: { channels: 4, width: DECODE_SIZE, height: DECODE_SIZE },
  })
    .webp()
    .toBuffer()

  return `data:image/webp;base64,${webp.toString('base64')}`
}

/** 画像のバイト列から blur プレースホルダを作る */
export const blurDataUrlFromBytes = async (
  bytes: Uint8Array,
): Promise<string> => {
  const { data, info } = await sharp(bytes)
    .resize(ENCODE_SIZE, ENCODE_SIZE, { fit: 'fill' })
    .ensureAlpha()
    .modulate({ saturation: 1.2 })
    .toFormat('raw')
    .toBuffer({ resolveWithObject: true })

  const blurhash = encode(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    COMPONENTS,
    COMPONENTS,
  )

  return await blurhashToDataUrl(blurhash)
}

const inFlight = new Map<string, Promise<string>>()

/**
 * 元画像のファイルパスから blur プレースホルダを作る。
 *
 * 同じファイルはビルドプロセス内で一度しか読まない。vite プラグインと rehype
 * プラグインは同じ画像に別経路で到達するため、両者でこのキャッシュを共有する。
 */
export const blurDataUrlFromFile = (path: string): Promise<string> => {
  const cached = inFlight.get(path)
  if (cached) return cached

  const task = readFile(path).then(blurDataUrlFromBytes)
  inFlight.set(path, task)

  return task
}
