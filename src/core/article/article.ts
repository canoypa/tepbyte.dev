import { z } from 'astro/zod'

export const articleSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  /** 本文の冒頭。一覧で概要として出す */
  excerpt: z.string(),
  publishedAt: z.string(),
})

export type Article = z.infer<typeof articleSchema>
