import { defineCollection, z } from 'astro:content'
import { UNSPLASH_URL_PATTERN, resolveUnsplash } from '~/core/resolve_unsplash'

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subhead: z.string(),
      image: z.union([
        image(),
        z.string().url().regex(UNSPLASH_URL_PATTERN).transform(resolveUnsplash),
      ]),
      tags: z.string().array().optional(),

      publishedAt: z.date(),
      updatedAt: z.date().optional(),
    }),
})

const productCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subhead: z.string(),
      images: image().array(),
      links: z.record(z.string(), z.string().url()).transform((v) => {
        return Object.entries(v).map(([label, url]) => ({ label, url }))
      }),
      tags: z.string().array(),

      publishedAt: z.date(),
    }),
})

const profileCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subhead: z.string(),
      avatar: image(),
      links: z.record(z.string(), z.string().url()).transform((v) => {
        return Object.entries(v).map(([label, url]) => ({ label, url }))
      }),
    }),
})

export const collections = {
  post: postCollection,
  product: productCollection,
  profile: profileCollection,
}
