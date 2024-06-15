import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subhead: z.string(),
      image: image(),

      publishedAt: z.date(),
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
