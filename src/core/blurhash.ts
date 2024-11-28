import { readFile } from 'node:fs/promises'
import type { GetImageResult } from 'astro'
import { isRemoteImage } from 'astro/assets/utils'
import { decode, encode } from 'blurhash'
import sharp from 'sharp'

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

export async function getBlurhashDataUrlFromImage(
  image: GetImageResult,
): Promise<string | undefined> {
  if (isRemoteImage(image.options.src)) {
    const buffer = await fetch(image.options.src).then((res) =>
      res.arrayBuffer(),
    )
    const data = new Uint8Array(buffer)
    return await blurDataUrlFromImage(data)
  }

  if ('src' in image.options.src) {
    const filename = image.options.src.src
      .replace(/^\/@fs/, '/')
      .replace(/\?.+$/, '')

    const imageFsPath = import.meta.env.PROD
      ? ['./dist', filename].join('')
      : filename

    const buffer = await readFile(imageFsPath)

    return await blurDataUrlFromImage(buffer)
  }

  return undefined
}
