import { getImage, imageConfig } from 'astro:assets'
import type { UnresolvedImageTransform } from 'astro'
import { isESMImportedImage, resolveSrc } from 'astro/assets/utils'
import { blurDataUrlFromFile } from '~/core/image/blur'

/**
 * ぼかしの元にするインポートした画像のファイルのパス。URL の画像と svg はぼかさない。
 * ImageMetadata 型にない列挙されないプロパティで、getImage が src を複製すると落ちるので、その前に読む。
 */
const sourcePathOf = async (src: UnresolvedImageTransform['src']) => {
  const image = await resolveSrc(src)
  if (!isESMImportedImage(image) || image.format === 'svg') return undefined

  const { fsPath } = image as { fsPath?: unknown }
  // 複製した ImageMetadata（`{ ...image }` など）ではパスが落ちている。ぼかしを黙って失わないよう止める
  if (typeof fsPath !== 'string') {
    throw new Error(`画像の元ファイルのパスが読めない: ${image.src}`)
  }

  return fsPath
}

/** Astro で変換した画像の属性と、読み込みを待つあいだ敷くぼかしの data URL を返す */
export const resolveImage = async (options: UnresolvedImageTransform) => {
  const sourcePath = await sourcePathOf(options.src)

  const layout = options.layout ?? imageConfig.layout ?? 'none'
  const [image, placeholder] = await Promise.all([
    getImage(
      layout === 'none'
        ? options
        : {
            ...options,
            fit: options.fit ?? imageConfig.objectFit ?? 'cover',
            position:
              options.position ?? imageConfig.objectPosition ?? 'center',
          },
    ),
    sourcePath === undefined ? undefined : blurDataUrlFromFile(sourcePath),
  ])

  return {
    attributes: {
      ...image.attributes,
      src: image.src,
      srcset:
        image.srcSet.values.length > 0 ? image.srcSet.attribute : undefined,
    },
    placeholder,
  }
}
