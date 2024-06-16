import type { CollectionEntry } from 'astro:content'
import type { FC } from 'react'
import { StyledLink } from '~/components/styled_link'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({
    direction: 'column',
    gap: { base: 8, md: 16 },
  }),
}

export type ProductListProps = {
  items: CollectionEntry<'product'>[]
}

export const ProductList: FC<ProductListProps> = ({ items }) => {
  return (
    <ul className={styles.root}>
      {items.map((v) => (
        <li key={v.slug}>
          <StyledLink href={`/products/${v.slug}`}>{v.data.title}</StyledLink>
          <p>{v.data.subhead}</p>
        </li>
      ))}
    </ul>
  )
}
