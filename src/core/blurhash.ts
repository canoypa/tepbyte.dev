import { readFile } from 'node:fs/promises'
import type { GetImageResult, ImageMetadata } from 'astro'
import { isRemoteImage } from 'astro/assets/utils'
import { decode, encode } from 'blurhash'
import sharp from 'sharp'
import type { SourcedImageMetadata } from './image/types'

type SharpInput =
  | Buffer
  | Uint8Array
  | Uint8ClampedArray
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array
  | Float32Array
  | Float64Array
  | string

/** 元画像 1 つにつき 1 回だけ計算する。キーはリモートなら URL、ローカルなら絶対パス */
const cache = new Map<string, Promise<string>>()

export async function blurhashToDataUrl(blurhash: string) {
  const size = 8

  const pixels = decode(blurhash, size, size)
  const image = await sharp(Buffer.from(pixels), {
    raw: { channels: 4, width: size, height: size },
  })
    .webp()
    .toBuffer()

  const dataUrl = `data:image/webp;base64,${image.toString('base64')}`

  return dataUrl
}

export async function blurDataUrlFromImage(data: SharpInput) {
  const { data: buffer, info } = await sharp(data)
    .resize(4, 4, { fit: 'fill' })
    .ensureAlpha()
    .modulate({ saturation: 1.2 })
    .toFormat('raw')
    .toBuffer({ resolveWithObject: true })

  const pixels = new Uint8ClampedArray(buffer)
  const blurhash = encode(pixels, info.width, info.height, 3, 3)

  return await blurhashToDataUrl(blurhash)
}

/** リモートはネットワーク、ローカルはディスク。得られるバイト列は同じなので以降は 1 本になる */
async function readImageBytes(src: string | ImageMetadata): Promise<SharpInput> {
  if (isRemoteImage(src)) {
    const buffer = await fetch(src).then((res) => res.arrayBuffer())
    return new Uint8Array(buffer)
  }

  return await readFile((src as SourcedImageMetadata).fsPath)
}

export async function getBlurhashDataUrlFromImage(
  image: GetImageResult,
): Promise<string | undefined> {
  const { src } = image.options

  const key = isRemoteImage(src) ? src : (src as SourcedImageMetadata).fsPath
  if (!key) return undefined

  const cached = cache.get(key)
  if (cached) return await cached

  const dataUrl = readImageBytes(src).then(blurDataUrlFromImage)
  cache.set(key, dataUrl)

  return await dataUrl
}
