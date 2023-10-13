import { FC } from 'react'
import { Image } from '~/components/image'
import { ImageMeta } from '~/types/parsed'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'flex',
    gap: 16,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    _scrollbar: { display: 'none' },
  }),
  image: css({
    maxW: 'fit-content',
    h: 216,
    rounded: 'extra-large',
    objectFit: 'cover',
    md: { h: 288 },
  }),
}

export type ScreenshotProps = {
  images: ImageMeta[]
}

export const Screenshot: FC<ScreenshotProps> = ({ images }) => {
  return (
    <div className={styles.root}>
      {images.map((v, i) => (
        <Image
          key={v.url}
          src={v.url}
          alt=""
          width={v.width}
          height={v.height}
          className={styles.image}
          blurDataUrl={v.blurDataUrl}
          priority={i === 0}
          lightbox
        />
      ))}
    </div>
  )
}
