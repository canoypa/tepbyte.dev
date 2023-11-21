import Link from 'next/link'
import { FC } from 'react'
import { Button } from '~/components/button'
import { NavigateNext } from '~/components/icons/navigate_next'
import { ProfileMeta } from '~/types/parsed'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'
import { ProfileCard } from './card'
import { ProfileLink } from './profile_link'

const styles = {
  root: css({
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    alignItems: 'center',
    gap: 64,
    paddingX: 32,
    paddingY: 64,
  }),
  card: flex({ justifyContent: 'center' }),
  info: flex({ direction: 'column', gap: 32 }),
  subhead: css({
    textStyle: { base: 'headline-small', md: 'headline-medium' },
    fontFamily: 'comfortaa',
  }),
}

export type HeroProps = {
  profile: ProfileMeta
}

export const Hero: FC<HeroProps> = ({ profile }) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <ProfileCard
          name={profile.name}
          photo={profile.photo}
          image={profile.background}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.subhead}>{profile.subhead}</span>
        <ProfileLink links={profile.links} />
        <span>
          <Button
            as={Link}
            href="/about"
            label="See full profile"
            trailing={<NavigateNext />}
          />
        </span>
      </div>
    </div>
  )
}
