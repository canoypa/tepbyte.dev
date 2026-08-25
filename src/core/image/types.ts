import type { ImageMetadata as AstroImageMetadata } from 'astro'
import type { UnsplashImageMetadata } from './resolve_unsplash'

export type ImageMetadata = AstroImageMetadata | UnsplashImageMetadata

/**
 * 元ファイルの絶対パスを保持した画像。付与しているのは ./preserve_source_path.ts。
 * Astro の ImageMetadata は type alias で宣言マージできないため交差型で表す。
 */
export type SourcedImageMetadata = AstroImageMetadata & { fsPath: string }
