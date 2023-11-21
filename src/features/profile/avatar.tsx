import { FC } from 'react'
import { Image } from '~/components/image'
import { ImageMeta } from '~/types/parsed'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    width: 96,
    height: 96,
    rounded: 'full',

    md: {
      width: 128,
      height: 128,
    },
  }),
}

export type AvatarProps = {
  image: ImageMeta
}

export const Avatar: FC<AvatarProps> = ({ image }) => {
  return (
    <Image
      src={image.url}
      alt=""
      width={image.width}
      height={image.height}
      className={styles.root}
      blurDataUrl={image.blurDataUrl}
      priority
    />
  )
}
