import { FC } from 'react'
import { ProfileMeta } from '~/types/parsed'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'
import { Avatar } from './avatar'
import { ProfileLink } from './profile_link'

const styles = {
  root: flex({ direction: 'column', gap: 24 }),
  primary: flex({ alignItems: 'center', gap: 24 }),
  name: css({ textStyle: 'headline-large', fontFamily: 'comfortaa' }),
  subhead: css({ textStyle: 'title-medium', fontFamily: 'comfortaa' }),
}

export type ProfileProps = {
  profile: ProfileMeta
}

export const Profile: FC<ProfileProps> = ({ profile }) => {
  return (
    <div className={styles.root}>
      <div className={styles.primary}>
        <Avatar image={profile.photo} />
        <span className={styles.name}>{profile.name}</span>
      </div>
      <div className={styles.subhead}>{profile.subhead}</div>
      <ProfileLink links={profile.links} />
    </div>
  )
}
