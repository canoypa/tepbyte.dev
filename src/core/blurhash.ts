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

export const blurhashPlaceholderStyle = (dataUrl: string) =>
  `background-image:url(${dataUrl});background-size:cover;background-position:50% 50%`
