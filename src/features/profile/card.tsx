import { FC } from 'react'
import { Image } from '~/components/image'
import { ImageMeta } from '~/types/parsed'
import { css } from '~pandacss/css'
import { Avatar } from './avatar'

const styles = {
  root: css({
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
    h: 300,
    aspectRatio: 'square',
    rounded: 'extra-large',
    overflow: 'hidden',
    md: { h: 400, aspectRatio: '3/4' },
  }),
  image: css({
    gridRow: '1/-1',
    gridColumn: '1/-1',
    filter: 'brightness(0.4)',
  }),
  img: css({ w: '100%', h: '100%', objectFit: 'cover' }),
  content: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gridRow: '1/-1',
    gridColumn: '1/-1',
    backdropFilter: 'blur(16px)',
  }),
  name: css({
    textStyle: 'display-small',
    fontFamily: 'comfortaa',
    md: { textStyle: 'display-medium' },
  }),
}

export type ProfileCardProps = {
  name: string
  photo: ImageMeta
  image: ImageMeta
}

export const ProfileCard: FC<ProfileCardProps> = ({ name, photo, image }) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <Image
          src={image.url}
          alt=""
          width={image.width}
          height={image.height}
          className={styles.img}
          blurDataUrl={image.blurDataUrl}
          priority
        />
      </div>
      <div className={styles.content}>
        <Avatar image={photo} />
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  )
}
