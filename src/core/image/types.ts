import type { ImageMetadata as AstroImageMetadata } from 'astro'
import type { UnsplashImageMetadata } from './resolve_unsplash'

/**
 * blur プレースホルダを持ちうる画像メタデータ。
 *
 * `blurDataUrl` は Astro の ImageMetadata にはないフィールドで、ローカル画像は
 * vite プラグイン（blur_vite_plugin.ts）が、Unsplash 画像は resolveUnsplash が載せる。
 */
export type ImageMetadata =
  | (AstroImageMetadata & { blurDataUrl?: string })
  | UnsplashImageMetadata

/**
 * 画像メタデータから blur プレースホルダを取り出す。
 *
 * getImage が返す src は Astro の型では `blurDataUrl` を持たないため、
 * cast ではなく実行時の形で判定する。
 */
export const blurDataUrlOf = (src: unknown): string | undefined => {
  if (typeof src !== 'object' || src === null) return undefined

  const { blurDataUrl } = src as { blurDataUrl?: unknown }

  return typeof blurDataUrl === 'string' ? blurDataUrl : undefined
}
