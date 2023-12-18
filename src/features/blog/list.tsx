import {
  argbFromHex,
  themeFromSourceColor,
} from '@material/material-color-utilities'
import Link from 'next/link'
import { FC } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  CardSummery,
  CardTitle,
} from '~/components/card'
import { createContentBasedColorStyles } from '~/core/theme'
import { ArticleMeta } from '~/types/parsed'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({
    direction: 'column',
    gap: { base: 16, sm: 24 },
  }),
}

export type BlogListProps = {
  items: Array<ArticleMeta & { slug: string }>
}

export const BlogList: FC<BlogListProps> = async ({ items }) => {
  const contentBasedColorStyles = items.map((v) => {
    const theme = themeFromSourceColor(argbFromHex(v.image.color))
    const styles = createContentBasedColorStyles(theme)
    return styles
  })

  return (
    <div className={styles.root}>
      {items.map((v, i) => (
        <Card
          key={v.slug}
          as={Link}
          href={`/blog/${v.slug}`}
          style={contentBasedColorStyles[i]}
        >
          <CardMedia
            src={v.image.url}
            alt=""
            width={v.image.width}
            height={v.image.height}
            blurDataUrl={v.image.blurDataUrl}
            priority={i <= 2}
          />
          <CardContent>
            <CardTitle>{v.title}</CardTitle>
            <CardSummery>{v.subhead}</CardSummery>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
