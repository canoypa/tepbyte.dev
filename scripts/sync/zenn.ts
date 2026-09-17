import type { Article } from '../../src/core/article/article.ts'
import { ZENN_USERNAME, zennArticleUrl } from '../../src/core/article/zenn.ts'
import { writeJsonIfChanged } from './write_json.ts'

const OUTPUT = new URL('../../src/content/synced/article.json', import.meta.url)

const API = 'https://zenn.dev/api/articles'

/** 一覧に出す概要の長さ。本文の幅が最大のとき、全角でおよそ 2 行に収まる */
const EXCERPT_LENGTH = 140

type ListItem = { slug: string; path: string; published_at: string }
type Detail = { title: string; body_html: string }

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
  '#39': "'",
  nbsp: ' ',
}

const toExcerpt = (bodyHtml: string) => {
  const text = bodyHtml
    // コードブロックは概要にならない
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    // メッセージボックスの「!」「?」の記号は本文ではない
    .replace(/<span class="msg-symbol">[\s\S]*?<\/span>/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    // 埋め込みのリンクカードは URL がそのまま本文に出る
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/&(#\d+|[a-z]+);/gi, (entity, name) => ENTITIES[name] ?? entity)
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > EXCERPT_LENGTH
    ? `${text.slice(0, EXCERPT_LENGTH)}…`
    : text
}

const fetchArticle = async (item: ListItem): Promise<Article> => {
  // 本文は一覧に含まれないので、1 件ずつ取る
  const { article } = await get<{ article: Detail }>(`${API}/${item.slug}`)
  return {
    id: item.slug,
    url: zennArticleUrl(item.path),
    title: article.title,
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
