import { resolveUnsplash } from './resolve_unsplash'

export const imageProcessor = async (image: ImageMetadata | string) => {
  if (typeof image === 'string') {
    return await resolveUnsplash(image)
  }

  return image
}
