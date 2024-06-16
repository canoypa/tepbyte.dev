import type { FC } from 'react'
import { Chip } from '~/components/chip'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({ gap: 8 }),
}

export type ProfileLinkProps = {
  links: { label: string; url: string }[]
}

export const ProfileLink: FC<ProfileLinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      {links.map(({ label, url }) => (
        <Chip key={url} as="a" href={url} label={label} />
      ))}
    </div>
  )
}
