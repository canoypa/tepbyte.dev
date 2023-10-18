import Link from 'next/link'
import { FC } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  CardSummery,
  CardTitle,
} from '~/components/card'
import { ProductMeta } from '~/types/parsed'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'grid',
    gridTemplateColumns: {
      base: 'repeat(1,minmax(0,1fr))',
      sm: 'repeat(2,minmax(0,1fr))',
      lg: 'repeat(3,minmax(0,1fr))',
    },
    gap: { base: 8, sm: 24 },
  }),
}

export type ProductListProps = {
  items: Array<ProductMeta & { slug: string }>
}

export const ProductList: FC<ProductListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v, i) => (
        <Card
          key={v.slug}
          as={Link}
          href={`/products/${v.slug}`}
          direction="column"
        >
          <CardMedia
            src={v.images[0].url}
            alt=""
            width={v.images[0].width}
            height={v.images[0].height}
            blurDataUrl={v.images[0].blurDataUrl}
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
