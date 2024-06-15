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

export type BlogListProps = {
  items: CollectionEntry<'post'>[]
}

export const BlogList: FC<BlogListProps> = ({ items }) => {
  return (
    <ul className={styles.root}>
      {items.map((v) => (
        <li key={v.slug}>
          <StyledLink href={`/blog/${v.slug}`}>{v.data.title}</StyledLink>
          <p>{v.data.subhead}</p>
        </li>
      ))}
    </ul>
  )
}
