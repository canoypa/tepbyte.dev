import { cache } from 'react'
import { requestAPI } from './request'

type Privacy = { body: any }
export const get = cache(async () => {
  const path = 'privacy/get'
  const data = await requestAPI<Privacy>(path)
  return data
})
