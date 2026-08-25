import { dirname, resolve } from 'node:path'
import { blurDataUrlFromFile } from './blur'

/**
 * hast のうち、このプラグインが触る範囲だけを写した最小の型。
 * hast の型パッケージは pnpm の隔離された node_modules にいるため直接は参照できない。
 */
type HastNode = {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

/** @astrojs/markdown-remark が vfile に載せる情報のうち、必要な分だけ */
type MarkdownVFile = {
  path?: string
  data?: { astro?: { localImagePaths?: string[] } }
}

const collectImages = (node: HastNode, into: HastNode[]): HastNode[] => {
  if (node.type === 'element' && node.tagName === 'img') into.push(node)
  for (const child of node.children ?? []) collectImages(child, into)

  return into
}

/**
 * Markdown 本文の `<img>` に blur プレースホルダを載せる rehype プラグイン。
 *
 * Astro は本文中の画像を素の `<img>` として書き出し、その際に ImageMetadata の
 * 未知のフィールドは捨てるため、vite プラグインが焼き込んだ `blurDataUrl` は
 * ここまで届かない。代わりに、Astro の rehypeImages が走る前に `<img>` へ
 * 属性として載せる（未知の属性は getImage を素通りして HTML に出る）。
 *
 * 値の生成経路は vite プラグインと同じ blurDataUrlFromFile で、キャッシュも共有する。
 */
export const rehypeBlurDataUrl = () => {
  return async (tree: HastNode, file: MarkdownVFile): Promise<void> => {
    const localImagePaths = file.data?.astro?.localImagePaths
    if (!file.path || !localImagePaths?.length) return

    const dir = dirname(file.path)

    await Promise.all(
      collectImages(tree, []).map(async (node) => {
        const src = node.properties?.src
        if (typeof src !== 'string') return

        const relativePath = decodeURI(src)
        if (!localImagePaths.includes(relativePath)) return

        const blurDataUrl = await blurDataUrlFromFile(
          resolve(dir, relativePath),
        )

        const properties = node.properties ?? {}
        const style = properties.style

        node.properties = {
          ...properties,
          'data-blur': '',
          style: [
            typeof style === 'string' ? style : null,
            `--blur-image:url(${blurDataUrl})`,
          ]
            .filter(Boolean)
            .join(';'),
        }
      }),
    )
  }
}
