import type { Article } from '../../src/core/article/article.ts'
import { ZENN_USERNAME, zennArticleUrl } from '../../src/core/article/zenn.ts'
import { writeJsonIfChanged } from './write_json.ts'

const OUTPUT = new URL('../../src/content/synced/article.json', import.meta.url)

const API = 'https://zenn.dev/api/articles'

/** 一覧に出す概要の長さ。本文の幅が最大のとき、全角でおよそ 2 行に収まる */
const EXCERPT_LENGTH = 140

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
  const items: ListItem[] = []
  let next: number | null = 1
  while (next !== null) {
    const page: { articles: ListItem[]; next_page: number | null } = await get(
      `${API}?username=${ZENN_USERNAME}&order=latest&page=${next}`,
    )
    // 一致しない username は無視され、Zenn 全体の新着が返る
    if (page.articles.some((a) => a.user.username !== ZENN_USERNAME)) {
      throw new Error(`articles by other users returned for "${ZENN_USERNAME}"`)
    }
    items.push(...page.articles)
    next = page.next_page
  }
  return items
}

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  nbsp: ' ',
}

const decodeEntity = (entity: string, name: string) => {
  if (name.startsWith('#x') || name.startsWith('#X')) {
    return String.fromCodePoint(Number.parseInt(name.slice(2), 16))
  }
  if (name.startsWith('#')) {
    return String.fromCodePoint(Number.parseInt(name.slice(1), 10))
  }
  return ENTITIES[name.toLowerCase()] ?? entity
}

// ブロックの境目だけ空白にする。インライン要素の前後に空白を入れると、
// 「ライブラリは<a>こちら</a>によると」が「ライブラリは こちら によると」になる
const BLOCK_TAG =
  /<\/?(?:p|div|h[1-6]|ul|ol|li|dl|dt|dd|blockquote|table|thead|tbody|tr|td|th|aside|details|summary|figure|figcaption|section)\b[^>]*>|<(?:br|hr)\b[^>]*>/gi

const toExcerpt = (bodyHtml: string) => {
  const text = bodyHtml
    // コードブロックは、<pre> の外に出るファイル名も含めて概要にならない
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<div class="code-block-filename-container">[\s\S]*?<\/div>/g, ' ')
    // 数式のソースと脚注の番号は本文ではない
    .replace(/<embed-katex[\s\S]*?<\/embed-katex>/g, ' ')
    .replace(/<sup class="footnote-ref">[\s\S]*?<\/sup>/g, '')
    // メッセージボックスの「!」「?」の記号は本文ではない
    .replace(/<span class="msg-symbol">[\s\S]*?<\/span>/g, ' ')
    .replace(BLOCK_TAG, ' ')
    .replace(/<[^>]*>/g, '')
    // 埋め込みのリンクカードは URL がそのまま本文に出る
    .replace(/https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]+/g, ' ')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, decodeEntity)
    .replace(/\s+/g, ' ')
    .trim()
  // 絵文字を途中で切らないよう、UTF-16 の単位ではなく文字で数える
  const chars = Array.from(text)
  return chars.length > EXCERPT_LENGTH
    ? `${chars.slice(0, EXCERPT_LENGTH).join('').trimEnd()}…`
    : text
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
