import { cache } from 'react'
import { requestAPI } from '~/lib/api/request'
import { ArticleMeta } from '~/types/parsed'

type Article = { meta: ArticleMeta; body: any }
export const get = cache(async (params: { slug: string }) => {
  const path = 'posts/get'
  const data = await requestAPI<Article>(path, params)
  return data
})

export const list = cache(async (params?: { limit?: number }) => {
  const path = 'posts/list'
  const data = await requestAPI<ArticleMeta[]>(path, params)
  return data
})
