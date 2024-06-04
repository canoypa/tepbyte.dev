import { FC } from 'react'
import { StyledLink } from '~/components/styled_link'
import { ArticleMeta } from '~/types/parsed'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({
    direction: 'column',
    gap: { base: 8, md: 16 },
  }),
}

export type BlogListProps = {
  items: Array<ArticleMeta>
}

export const BlogList: FC<BlogListProps> = ({ items }) => {
  return (
    <ul className={styles.root}>
      {items.map((v) => (
        <li key={v.slug}>
          <StyledLink href={`/blog/${v.slug}`}>{v.title}</StyledLink>
          <p>{v.subhead}</p>
        </li>
      ))}
    </ul>
  )
}
