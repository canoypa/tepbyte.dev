import type { ImageMetadata as AstroImageMetadata } from 'astro'
import type { UnsplashImageMetadata } from './resolve_unsplash'

export type ImageMetadata = AstroImageMetadata | UnsplashImageMetadata
