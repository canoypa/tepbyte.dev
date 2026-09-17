import { getImage, imageConfig } from 'astro:assets'
import type { UnresolvedImageTransform } from 'astro'
import { getBlurhashDataUrlFromImage } from '~/core/blurhash'

/** Astro で変換した画像の属性と、読み込みを待つあいだ敷くぼかしの data URL を返す */
export const resolveImage = async (options: UnresolvedImageTransform) => {
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
    placeholder: await getBlurhashDataUrlFromImage(image),
  }
}
