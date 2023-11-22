import { FC } from 'react'
import { Image } from '~/components/image'
import { ImageMeta } from '~/types/parsed'
import { css } from '~pandacss/css'
import { Avatar } from './avatar'

const styles = {
  root: css({
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
    height: { base: 300, md: 400 },
    rounded: 'extra-large',
    aspectRatio: { base: 'square', md: '3/4' },
    overflow: 'hidden',
  }),
  image: css({
    gridArea: '1/1/-1/-1',

    filter: 'brightness(0.4)',
  }),
  img: css({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }),
  content: css({
    gridArea: '1/1/-1/-1',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    backdropFilter: 'blur(16px)',
  }),
  name: css({
    textStyle: { base: 'display-small', md: 'display-medium' },
    fontFamily: 'comfortaa',
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
