import type { Loader } from 'astro/loaders'
import { type AssetExif, createApi, type UnsplashApi } from 'unsplash-js'
import type { Photo, PhotoExif } from '~/core/image/photo'
import { UNSPLASH_COLLECTION_ID } from '~/core/image/unsplash'

const PER_PAGE = 30

// unsplash-js の生成型に alt_description が無い。API は返す
const altDescription = (asset: object): string | null =>
  (asset as { alt_description: string | null }).alt_description

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

/** Demo tier の 50 req/h に合わせた window(1 回の同期はこれを超えない前提) */
const MIN_SYNC_INTERVAL_MS = 60 * 60 * 1000

const fetchCollection = async (unsplash: UnsplashApi): Promise<Photo[]> => {
  const photos: Photo[] = []
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
    const results = data
    for (const r of results) {
      photos.push({
        id: r.id,
        url: r.urls.raw,
        width: r.width,
        height: r.height,
        blurHash: r.blur_hash ?? null,
        alt: altDescription(r) ?? r.description ?? null,
        createdAt: r.created_at,
        exif: null,
      })
    }
    if (results.length < PER_PAGE) break
  }
  return photos
}

/**
 * 対象の Collection は非公開のため、client_id ではなく `read_collections`
 * スコープを持つ User Access Token が要る(取得方法は .env.example 参照)。
 *
 * `astro check`/`astro dev` はいずれも起動のたびに sync を呼ぶので、
 * 直近に同期済みならリクエストを送らずに抜ける。
 */
export const unsplashPhotoLoader: Loader = {
  name: 'unsplash-photo-loader',
  load: async ({ store, meta, parseData, logger }) => {
    const lastSyncedAt = Number(meta.get('lastSyncedAt') ?? 0)
    if (Date.now() - lastSyncedAt < MIN_SYNC_INTERVAL_MS) {
      logger.info('synced recently, skipping')
      return
    }

    const accessToken = import.meta.env.UNSPLASH_ACCESS_TOKEN
    if (!accessToken) throw new Error('UNSPLASH_ACCESS_TOKEN is not set')

    const unsplash = createApi({
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const previousIds = store.keys()

    let photos: Photo[]
    try {
      photos = await fetchCollection(unsplash)
    } catch (error) {
      // 残すものが無ければ「前回のまま」にはならず、空の Photos が出る
      if (previousIds.length === 0) throw error
      logger.warn(`failed to list collection, keeping previous data: ${error}`)
      return
    }

    for (const photo of photos) {
      const prev = store.get(photo.id)?.data as Photo | undefined
      if (prev?.exif) {
        photo.exif = prev.exif
        continue
      }

      const { data, error } = await unsplash.GET('/photos/{assetSlug}', {
        params: { path: { assetSlug: photo.id } },
      })
      if (error) {
        logger.warn(`exif ${photo.id}: ${JSON.stringify(error)}`)
        continue
      }
      photo.exif = toExif(data.exif)
    }

    const currentIds = new Set(photos.map((photo) => photo.id))
    for (const id of previousIds) {
      if (!currentIds.has(id)) store.delete(id)
    }

    for (const photo of photos) {
      const data = await parseData({ id: photo.id, data: photo })
      store.set({ id: photo.id, data })
    }

    meta.set('lastSyncedAt', String(Date.now()))
  },
}
