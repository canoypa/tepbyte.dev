import type { FC } from 'react'
import { Chip } from '~/components/chip'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({ gap: 8 }),
}

export type LinkProps = {
  links: { url: string; label: string }[]
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
