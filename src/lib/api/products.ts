import { cache } from 'react'
import { ProductMeta } from '~/types/parsed'
import { requestAPI } from './request'

type Product = { meta: ProductMeta; body: any }
export const get = cache(async (params: { slug: string }) => {
  const path = 'products/get'
  const data = await requestAPI<Product>(path, params)
  return data
})

export const list = cache(async (params?: { limit?: number }) => {
  const path = 'products/list'
  const data = await requestAPI<ProductMeta[]>(path, params)
  return data
})
