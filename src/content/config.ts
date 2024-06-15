import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({}),
})

const productCollection = defineCollection({
  type: 'content',
  schema: z.object({}),
})

const profileCollection = defineCollection({
  type: 'content',
  schema: z.object({}),
})

export const collections = {
  post: postCollection,
  product: productCollection,
  profile: profileCollection,
}
