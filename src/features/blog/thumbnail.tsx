import { FC } from 'react';
import { tw } from '~/lib/tw';
import { ImageMeta } from '~/types/parsed';

const styles = {
  root: /* Tailwind */ tw`flex flex-col gap-y-2`,
  img: /* Tailwind */ tw`
    w-full h-[216px] rounded-extra-large object-cover
    md:h-[288px]`,
  attribution: /* Tailwind */ tw`text-label-medium font-comfortaa italic`,
};

export type ThumbnailProps = {
  image: ImageMeta;
};

export const Thumbnail: FC<ThumbnailProps> = ({ image }) => {
  return (
    <div className={styles.root}>
      <img src={image.url} alt="" className={styles.img} />

      {image.attribution && (
        <small className={styles.attribution}>
          <span>Photo by </span>
          <a href={image.attribution.user_url}>{image.attribution.user_name}</a>
          <span> on </span>
          <a href={image.attribution.site_url}>{image.attribution.site_name}</a>
        </small>
      )}
    </div>
  );
};
