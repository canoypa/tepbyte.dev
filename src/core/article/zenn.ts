export const ZENN_USERNAME = 'canoypa'

const ZENN_URL = 'https://zenn.dev'

export const ZENN_PROFILE_URL = `${ZENN_URL}/${ZENN_USERNAME}`

/** API が返す path は `/{publication}/articles/{slug}` のような絶対パス */
export const zennArticleUrl = (path: string) => `${ZENN_URL}${path}`
