export type ImageMeta = {
  url: string
  width: number
  height: number

  blurDataUrl: string
  color: string

  attribution?: {
    authorName: string
    authorUrl: string
    siteName: string
    siteUrl: string
  }
}

export type LabelData = {
  label: string
}

export type LinkData = LabelData & {
  url: string
}

export type ProfileMeta = {
  name: string
  subhead: string
  photo: ImageMeta
  background: ImageMeta
  links: LinkData[]
}

export type ProductMeta = {
  slug: string
  title: string
  subhead: string
  links: LinkData[]
  images: ImageMeta[]
  tags: LabelData[]
}

export type ArticleMeta = {
  slug: string
  title: string
  subhead: string
  image: ImageMeta
  tags: LabelData[]
  publishedAt: string
  updatedAt?: string
}
