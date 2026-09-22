import { decode, encode } from 'blurhash'
import sharp, { type SharpInput } from 'sharp'

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
  // Astro の sharp サービスに揃える。Astro が変換できる壊れかけの画像を、ぼかしでだけ落とさないように
  const { data: buffer, info } = await sharp(data, { failOn: 'none' })
    .rotate()
    .resize(4, 4, { fit: 'fill' })
    .ensureAlpha()
    .modulate({ saturation: 1.2 })
    .toFormat('raw')
    .toBuffer({ resolveWithObject: true })

  const pixels = new Uint8ClampedArray(buffer)
  const blurhash = encode(pixels, info.width, info.height, 3, 3)

  return await blurhashToDataUrl(blurhash)
}
