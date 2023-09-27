import Link from 'next/link'
import { FC } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  CardSummery,
  CardTitle,
} from '~/components/card'
import { tw } from '~/lib/tw'
import { ArticleMeta } from '~/types/parsed'

const styles = {
  root: /* Tailwind */ tw`
    flex flex-col gap-4
    sm:gap-6`,
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
