import { FC } from 'react'
import { Image } from '~/components/image'
import { ProfileMeta } from '~/types/parsed'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'
import { ProfileLink } from './profile_link'

const styles = {
  root: css({
    display: 'grid',
    gridTemplate: 'auto / auto 1fr',
    gridTemplateAreas: {
      base: '"photo name" "info info"',
      md: '"photo name" "photo info"',
    },
    alignItems: 'center',
    columnGap: { base: 24, md: 32 },
    rowGap: 16,

    fontFamily: 'comfortaa',
  }),
  photo: css({
    gridArea: 'photo',

    width: { base: 96, md: 128 },
    height: { base: 96, md: 128 },
    rounded: 'full',
  }),
  name: css({
    gridArea: 'name',

    textStyle: 'display-small',
  }),
  info: flex({
    gridArea: 'info',

    direction: 'column',
    rowGap: 16,
    textStyle: 'body-large',
  }),
}

export type HeroProps = {
  profile: ProfileMeta
}

export const Hero: FC<HeroProps> = ({ profile }) => {
  return (
    <div className={styles.root}>
      <Image
        src={profile.photo.url}
        alt=""
        width={profile.photo.width}
        height={profile.photo.height}
        className={styles.photo}
        blurDataUrl={profile.photo.blurDataUrl}
        priority
      />
      <span className={styles.name}>{profile.name}</span>
      <div className={styles.info}>
        <span>{profile.subhead}</span>
        <ProfileLink links={profile.links} />
      </div>
    </div>
  )
}
