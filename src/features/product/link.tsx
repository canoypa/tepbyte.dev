import type { FC } from 'react'
import { Chip } from '~/components/chip'
import type { LinkData } from '~/types/parsed'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({ gap: 8 }),
}

export type LinkProps = {
  links: LinkData[]
}

export const Link: FC<LinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      {links.map(({ label, url }) => (
        <Chip key={url} as="a" href={url} label={label} />
      ))}
    </div>
  )
}
