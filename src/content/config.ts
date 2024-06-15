import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      image: image(),
    }),
})

const productCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      images: image().array(),
    }),
})

const profileCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      avatar: image(),
    }),
})

export const collections = {
  post: postCollection,
  product: productCollection,
  profile: profileCollection,
}
