import { type AssetExif, createApi, type UnsplashApi } from 'unsplash-js'
import type { Photo, PhotoExif } from '../../src/core/image/photo.ts'
import { UNSPLASH_COLLECTION_ID } from '../../src/core/image/unsplash.ts'
import { writeJsonIfChanged } from './write_json.ts'

const OUTPUT = new URL('../../src/content/synced/photo.json', import.meta.url)

const PER_PAGE = 30

const toExif = (raw: AssetExif | undefined): PhotoExif | null => {
  if (!raw) return null
  const exif: PhotoExif = {
    make: raw.make ?? null,
    model: raw.model ?? null,
    focalLength: raw.focal_length ?? null,
    aperture: raw.aperture ?? null,
    exposureTime: raw.exposure_time ?? null,
    iso: raw.iso ?? null,
  }
  return Object.values(exif).every((v) => v == null) ? null : exif
}

const fetchCollectionIds = async (unsplash: UnsplashApi): Promise<string[]> => {
  const ids: string[] = []
  for (let page = 1; ; page++) {
    const { data, error } = await unsplash.GET(
      '/collections/{collectionId}/photos',
      {
        params: {
          path: { collectionId: UNSPLASH_COLLECTION_ID },
          query: { page, per_page: PER_PAGE },
        },
      },
    )
    if (error) throw new Error(`list page ${page}: ${JSON.stringify(error)}`)
    ids.push(...data.map((asset) => asset.id))
    if (data.length < PER_PAGE) return ids
  }
}

// EXIF は一覧に含まれないので、1 枚ずつ取る
const fetchPhoto = async (
  unsplash: UnsplashApi,
  id: string,
): Promise<Photo> => {
  const { data, error } = await unsplash.GET('/photos/{assetSlug}', {
    params: { path: { assetSlug: id } },
  })
  if (error) throw new Error(`photo ${id}: ${JSON.stringify(error)}`)
  return {
    id: data.id,
    url: data.urls.raw,
    width: data.width,
    height: data.height,
    blurHash: data.blur_hash ?? null,
    // unsplash-js の型に alt_description が無い。API は返す
    alt:
      (data as { alt_description?: string | null }).alt_description ??
      data.description ??
      null,
    createdAt: data.created_at,
    exif: toExif(data.exif),
  }
}

const accessToken = process.env.UNSPLASH_ACCESS_TOKEN
if (!accessToken) throw new Error('UNSPLASH_ACCESS_TOKEN is not set')

const unsplash = createApi({
  headers: { Authorization: `Bearer ${accessToken}` },
})

const ids = await fetchCollectionIds(unsplash)
const photos = await Promise.all(ids.map((id) => fetchPhoto(unsplash, id)))

// Collection 上で並べ替えただけで差分が出ないようにする
photos.sort(
  (a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id),
)

// 比較からだけ外す。ixid は取得のたびに変わるが、API Guidelines が URL に残すよう求めている
const withoutIxid = (photos: Photo[]) =>
  photos.map((photo) => {
    const url = new URL(photo.url)
    url.searchParams.delete('ixid')
    return { ...photo, url: url.toString() }
  })

await writeJsonIfChanged(OUTPUT, photos, withoutIxid)
