import type { Nodes } from 'hast'
import { fromHtml } from 'hast-util-from-html'
import { toText } from 'hast-util-to-text'
import type { Article } from '../../src/core/article/article.ts'
import { ZENN_USERNAME, zennArticleUrl } from '../../src/core/article/zenn.ts'
import { writeJsonIfChanged } from './write_json.ts'

const OUTPUT = new URL('../../src/content/synced/article.json', import.meta.url)

const API = 'https://zenn.dev/api/articles'

/** トップに出す、新しい順の件数 */
const COUNT = 5

/** 本文を丸ごと持ち込まないための上限。見える長さはカード側の 2 行の省略で決まる */
const EXCERPT_LENGTH = 300

type ListItem = {
  slug: string
  path: string
  title: string
  published_at: string
  user: { username: string }
}
type Detail = { body_html: string }

const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url}: ${response.status}`)
  return await response.json()
}

const fetchList = async (): Promise<ListItem[]> => {
  const { articles } = await get<{ articles: ListItem[] }>(
    `${API}?username=${ZENN_USERNAME}&order=latest&count=${COUNT}`,
  )
  // 一致しない username は無視され、Zenn 全体の新着が返る
  if (articles.some((a) => a.user.username !== ZENN_USERNAME)) {
    throw new Error(`articles by other users returned for "${ZENN_USERNAME}"`)
  }
  return articles
}

// 概要に含めない、本文ではない要素
const isExcluded = (node: Nodes) => {
  if (node.type !== 'element') return false
  const classes = node.properties.className
  const hasClass = (name: string) =>
    Array.isArray(classes) && classes.includes(name)
  return (
    // コードブロックは、<pre> の外に出るファイル名も含めて概要にならない
    node.tagName === 'pre' ||
    hasClass('code-block-filename-container') ||
    // 数式のソース、脚注の番号、メッセージボックスの「!」「?」の記号
    node.tagName === 'embed-katex' ||
    hasClass('footnote-ref') ||
    hasClass('msg-symbol') ||
    // 埋め込みのリンクカードに添えられた、非表示の URL
    String(node.properties.style ?? '').includes('display:none')
  )
}

const prune = (node: Nodes) => {
  if (!('children' in node)) return
  node.children = node.children.filter(
    (child) => !isExcluded(child),
  ) as typeof node.children
  for (const child of node.children) prune(child)
}

const toExcerpt = (bodyHtml: string) => {
  const tree = fromHtml(bodyHtml, { fragment: true })
  prune(tree)
  // innerText と同じく、ブロックの境目だけが改行になり、インライン要素の前後は詰まる
  const text = toText(tree).replace(/\s+/g, ' ').trim()
  // 絵文字を途中で切らないよう、UTF-16 の単位ではなく文字で数える
  return Array.from(text).slice(0, EXCERPT_LENGTH).join('').trimEnd()
}

const fetchArticle = async (item: ListItem): Promise<Article> => {
  // 本文は一覧に含まれないので、1 件ずつ取る
  const { article } = await get<{ article: Detail }>(`${API}/${item.slug}`)
  return {
    id: item.slug,
    url: zennArticleUrl(item.path),
    title: item.title,
    excerpt: toExcerpt(article.body_html),
    publishedAt: item.published_at,
  }
}

const list = await fetchList()
const articles = await Promise.all(list.map(fetchArticle))

articles.sort(
  (a, b) =>
    a.publishedAt.localeCompare(b.publishedAt) || a.id.localeCompare(b.id),
)

await writeJsonIfChanged(OUTPUT, articles)
