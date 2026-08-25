import type { ImageMetadata } from 'astro'
import { createApi } from 'unsplash-js'
import { blurhashToDataUrl } from './blur'

export const UNSPLASH_URL_PATTERN =
  /^https?:\/\/unsplash\.com\/photos\/(?<id>[a-zA-Z0-9-_]{11})/

export type UnsplashImageMetadata = ImageMetadata & {
  blurDataUrl?: string
  attribution: {
    authorName: string
    authorUrl: string
    siteName: string
    siteUrl: string
  }
}

const unsplash = createApi({
  accessKey: import.meta.env.UNSPLASH_ACCESS_KEY,
})

export const resolveUnsplash = async (
  url: string,
): Promise<UnsplashImageMetadata> => {
  const match = url.match(UNSPLASH_URL_PATTERN)
  const photoId = match?.groups?.id

  if (!photoId) {
    throw new Error(`Invalid Unsplash URL: ${url}`)
  }

  const res = await unsplash.photos.get({ photoId })

  if (res.type === 'error') {
    throw res.errors
  }

  const data = res.response

  if (import.meta.env.PROD) {
    // Triggering a Download
    // see: https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
    await unsplash.photos
      .trackDownload({
        downloadLocation: data.links.download_location,
      })
      .catch(() => {
        console.warn(`Failed to track download for unsplash photo: ${photoId}`)
      })
  }

  // Attribution
  // see: https://help.unsplash.com/en/articles/2511315-guideline-attribution
  const attributionParams = new URLSearchParams({
    utm_source: import.meta.env.UNSPLASH_APP_NAME,
    utm_medium: 'referral',
  })

  const userUrl = new URL(`https://unsplash.com/@${data.user.username}`)
  userUrl.search = attributionParams.toString()
  const siteUrl = new URL('https://unsplash.com')
  siteUrl.search = attributionParams.toString()

  const srcUrl = new URL(data.urls.regular)
  srcUrl.searchParams.set('fm', 'webp')

  // Unsplash は blurhash を返すので、画像を取りに行かずにプレースホルダを作れる
  const blurDataUrl = data.blur_hash
    ? await blurhashToDataUrl(data.blur_hash)
    : undefined

  const metadata: UnsplashImageMetadata = {
    src: srcUrl.toString(),
    width: data.width,
    height: data.height,
    format: 'webp',

    blurDataUrl,

    attribution: {
      authorName: data.user.name,
      authorUrl: userUrl.toString(),
      siteName: 'Unsplash',
      siteUrl: siteUrl.toString(),
    },
  }

  return metadata
}
