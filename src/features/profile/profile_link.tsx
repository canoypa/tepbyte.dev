import Link from 'next/link'
import { FC } from 'react'
import { Chip } from '~/components/chip'
import { LinkData } from '~/types/parsed'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({ gap: 8 }),
}

export type ProfileLinkProps = {
  links: LinkData[]
}

export const ProfileLink: FC<ProfileLinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      {links.map(({ label, url }) => (
        <Chip key={url} as={Link} href={url} label={label} />
      ))}
    </div>
  )
}
