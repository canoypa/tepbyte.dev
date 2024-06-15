import type { FC } from 'react'
import { Image } from '~/components/image'
import { StyledLink } from '~/components/styled_link'
import type { ImageMeta } from '~/types/parsed'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({ direction: 'column', rowGap: 8 }),
  img: css({
    width: '100%',
    height: { base: 216, md: 288 },
    rounded: 'extra-large',
    objectFit: 'cover',
  }),
  attribution: css({
    textStyle: 'label-medium',
    fontFamily: 'comfortaa',
    fontStyle: 'italic',
  }),
}

export type ThumbnailProps = {
  image: ImageMeta
}

export const Thumbnail: FC<ThumbnailProps> = ({ image }) => {
  return (
    <figure className={styles.root}>
      <Image
        src={image.url}
        alt=""
        width={image.width}
        height={image.height}
        className={styles.img}
        blurDataUrl={image.blurDataUrl}
        priority
      />

      {image.attribution && (
        <figcaption>
          <small className={styles.attribution}>
            <span>Photo by </span>
            <StyledLink href={image.attribution.authorUrl}>
              {image.attribution.authorName}
            </StyledLink>
            <span> on </span>
            <StyledLink href={image.attribution.siteUrl}>
              {image.attribution.siteName}
            </StyledLink>
          </small>
        </figcaption>
      )}
    </figure>
  )
}
