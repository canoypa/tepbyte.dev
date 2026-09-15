import { z } from 'astro/zod'

const photoExifSchema = z.object({
  make: z.string().nullable(),
  model: z.string().nullable(),
  /** 以下 3 つは単位を含まない生の値。"35.0" / "2.8" / "1/467" */
  focalLength: z.string().nullable(),
  aperture: z.string().nullable(),
  exposureTime: z.string().nullable(),
  iso: z.number().nullable(),
})

export const photoSchema = z.object({
  id: z.string(),
  /** `urls.raw`。そのままでは表示に使えない。`photoSrc()` を通すこと */
  url: z.string(),
  width: z.number(),
  height: z.number(),
  blurHash: z.string().nullable(),
  alt: z.string().nullable(),
  createdAt: z.string(),
  exif: photoExifSchema.nullable(),
})

export type Photo = z.infer<typeof photoSchema>
export type PhotoExif = z.infer<typeof photoExifSchema>

export const photoSrc = (url: string, width: number): string => {
  const src = new URL(url)
  src.searchParams.set('w', String(width))
  src.searchParams.set('q', '75')
  src.searchParams.set('auto', 'format')
  return src.toString()
}

export const PHOTO_THUMBNAIL_WIDTH = 640
export const PHOTO_FULL_WIDTH = 1600

const PHOTO_WIDTHS = [PHOTO_THUMBNAIL_WIDTH, PHOTO_FULL_WIDTH] as const

export const photoSrcSet = (url: string): string =>
  PHOTO_WIDTHS.map((w) => `${photoSrc(url, w)} ${w}w`).join(', ')

export const formatExif = (exif: PhotoExif): string => {
  const parts: string[] = []
  const camera = [exif.make, exif.model].filter((v) => v !== null).join(' ')
  if (camera) parts.push(camera)
  if (exif.focalLength) parts.push(`${exif.focalLength}mm`)
  if (exif.aperture) parts.push(`ƒ/${exif.aperture}`)
  if (exif.exposureTime) parts.push(`${exif.exposureTime}s`)
  if (exif.iso != null) parts.push(`ISO ${exif.iso}`)
  // 中黒の前を NBSP にして直前の値に結び付ける。ふつうの空白だと
  // 折り返しが中黒の前で起きて、次の行が「· ƒ/2.8」と区切りから始まる
  return parts.join('\u00a0\u00b7 ')
}
