import { FC } from 'react'
import { Image } from '~/components/image'
import { StyledLink } from '~/components/styled_link'
import { tw } from '~/lib/tw'
import { ImageMeta } from '~/types/parsed'

const styles = {
  root: /* Tailwind */ tw`flex flex-col gap-y-2`,
  img: /* Tailwind */ tw`
    w-full h-[216px] rounded-extra-large object-cover
    md:h-[288px]`,
  attribution: /* Tailwind */ tw`text-label-medium font-comfortaa italic`,
}

export type ThumbnailProps = {
  image: ImageMeta
}

export const Thumbnail: FC<ThumbnailProps> = ({ image }) => {
  return (
    <div className={styles.root}>
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
      )}
    </div>
  )
}
