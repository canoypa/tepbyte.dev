import { getImage, imageConfig } from 'astro:assets'
import type { UnresolvedImageTransform } from 'astro'
import { blurDataUrlFromFile, RASTER_IMAGE } from '~/core/image/blur'

/**
 * インポートした画像の元ファイルのパス。
 * ImageMetadata 型にない列挙されないプロパティで、getImage が src を複製すると落ちるので、その前に読む。
 */
const sourcePathOf = async (src: UnresolvedImageTransform['src']) => {
  const resource = await src
  const image =
    typeof resource === 'object' && 'default' in resource
      ? resource.default
      : resource
  if (typeof image !== 'object') return undefined

  const { fsPath } = image as { fsPath?: unknown }

  return typeof fsPath === 'string' ? fsPath : undefined
}

/** Astro で変換した画像の属性と、読み込みを待つあいだ敷くぼかしの data URL を返す */
export const resolveImage = async (options: UnresolvedImageTransform) => {
  const sourcePath = await sourcePathOf(options.src)

  const layout = options.layout ?? imageConfig.layout ?? 'none'
  const image = await getImage(
    layout === 'none'
      ? options
      : {
          ...options,
          fit: options.fit ?? imageConfig.objectFit ?? 'cover',
          position: options.position ?? imageConfig.objectPosition ?? 'center',
        },
  )

  return {
    attributes: {
      ...image.attributes,
      src: image.src,
      srcset:
        image.srcSet.values.length > 0 ? image.srcSet.attribute : undefined,
    },
    placeholder:
      sourcePath !== undefined && RASTER_IMAGE.test(sourcePath)
        ? await blurDataUrlFromFile(sourcePath)
        : undefined,
  }
}
