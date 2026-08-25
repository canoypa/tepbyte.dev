import { z } from 'astro/zod'

// Attribution
// see: https://help.unsplash.com/en/articles/2511315-guideline-attribution
const attributionParams = new URLSearchParams({
  utm_source: 'www.tepbyte.dev',
  utm_medium: 'referral',
})

const attributionUrl = (path: string) => {
  const url = new URL(path, 'https://unsplash.com')
  url.search = attributionParams.toString()

  return url.toString()
}

/**
 * 写真そのものは Unsplash License の下でリポジトリに取り込み、frontmatter に
 * 持つのは帰属表示に必要な値だけとする。hotlink を求める API Guidelines は
 * API 利用時の条項で、API を介さない取り込みには掛からない。
 */
export const unsplashAttributionSchema = z
  .object({
    authorName: z.string(),
    authorUsername: z.string(),
  })
  .transform(({ authorName, authorUsername }) => ({
    authorName,
    authorUrl: attributionUrl(`/@${authorUsername}`),
    siteName: 'Unsplash',
    siteUrl: attributionUrl('/'),
  }))

export type UnsplashAttribution = z.infer<typeof unsplashAttributionSchema>
