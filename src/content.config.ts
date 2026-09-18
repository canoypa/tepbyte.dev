import { defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { articleSchema } from '~/core/article/article'
import { photoSchema } from '~/core/image/photo'
import { unsplashAttributionSchema } from '~/core/image/unsplash'

const postCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/post' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subhead: z.string(),
      image: image(),
      attribution: unsplashAttributionSchema.optional(),
      tags: z.string().array().optional(),

      publishedAt: z.date(),
      updatedAt: z.date().optional(),
    }),
})

const productCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/product' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subhead: z.string(),
      images: image().array(),
      links: z.record(z.string(), z.url()).transform((v) => {
        return Object.entries(v).map(([label, url]) => ({ label, url }))
      }),
      tags: z.string().array(),

      publishedAt: z.date(),
    }),
})

const profileCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/profile' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subhead: z.string(),
      about: z.string(),
      avatar: image(),
      cover: image(),
      links: z.record(z.string(), z.url()).transform((v) => {
        return Object.entries(v).map(([label, url]) => ({ label, url }))
      }),
    }),
})

// synced/ は `pnpm sync:*` が書き出す
const photoCollection = defineCollection({
  loader: file('src/content/synced/photo.json'),
  schema: photoSchema,
})

const articleCollection = defineCollection({
  loader: file('src/content/synced/article.json'),
  schema: articleSchema,
})

export const collections = {
  post: postCollection,
  product: productCollection,
  profile: profileCollection,
  photo: photoCollection,
  article: articleCollection,
}
