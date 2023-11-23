import { cache } from 'react'
import { ProfileMeta } from '~/types/parsed'
import { requestAPI } from './request'

type Profile = { meta: ProfileMeta; body: any }
export const get = cache(async () => {
  const path = 'profile/get'
  const data = await requestAPI<Profile>(path)
  return data
})
