import { FC } from 'react'
import { Image } from '~/components/image'
import { tw } from '~/lib/tw'
import { ImageMeta } from '~/types/parsed'

const styles = {
  root: /* Tailwind */ tw`flex gap-4 overflow-x-auto scrollbar-none`,
  image: /* Tailwind */ tw`
    max-w-fit h-[216px] rounded-extra-large object-cover
    md:h-[288px]`,
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
