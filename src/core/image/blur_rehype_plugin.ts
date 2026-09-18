import { dirname, resolve } from 'node:path'
import type { Element, Nodes, Root } from 'hast'
import { blurhashPlaceholderStyle } from '../blurhash'
import { blurDataUrlFromFile } from './blur'

/** @astrojs/markdown-remark が vfile に載せる情報のうち、使う分だけ */
type MarkdownFile = {
  path?: string
  data: { astro?: { localImagePaths?: string[] } }
}

const collectImages = (node: Nodes, into: Element[] = []): Element[] => {
  if (node.type === 'element' && node.tagName === 'img') into.push(node)
  if ('children' in node) {
    for (const child of node.children) collectImages(child, into)
  }

  return into
}

/**
 * Markdown 本文のローカル画像に、元画像から作ったぼかしを敷く。
 *
 * Astro が本文の画像を解決するときは ImageMetadata の未知のフィールドを捨てるので、
 * vite プラグインが焼き込んだ blurDataUrl はここには届かない。そこで Astro の rehypeImages より前に
 * `<img>` の属性として載せておく。未知の属性は getImage を素通りしてそのまま HTML に出る。
 */
export const rehypeBlurPlaceholder = () => {
  return async (tree: Root, file: MarkdownFile): Promise<void> => {
    const localImagePaths = file.data.astro?.localImagePaths
    if (!file.path || !localImagePaths?.length) return

    const dir = dirname(file.path)

    await Promise.all(
      collectImages(tree).map(async (node) => {
        const { src } = node.properties
        if (typeof src !== 'string') return

        // rehypeImages と同じ突き合わせ方
        const path = decodeURI(src)
        if (!localImagePaths.includes(path)) return

        const blurDataUrl = await blurDataUrlFromFile(resolve(dir, path))

        // rehypeImages が properties をそのまま HTML 属性名として書き出すため、hast の dataBlurhash ではなくこの名前にする
        node.properties['data-blurhash'] = ''
        node.properties.style = blurhashPlaceholderStyle(blurDataUrl)
      }),
    )
  }
}
