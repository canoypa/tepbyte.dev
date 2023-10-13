import Link from 'next/link'
import { FC } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  CardSummery,
  CardTitle,
} from '~/components/card'
import { ArticleMeta } from '~/types/parsed'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({
    direction: 'column',
    gap: 16,
    sm: { gap: 24 },
  }),
}

export type BlogListProps = {
  items: Array<ArticleMeta & { slug: string }>
}

export const BlogList: FC<BlogListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v, i) => (
        <Card key={v.slug} as={Link} href={`/blog/${v.slug}`}>
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
