import { FC } from 'react';
import { Image } from '~/components/image';
import { tw } from '~/lib/tw';
import { ImageMeta } from '~/types/parsed';

const styles = {
  root: /* Tailwind */ tw`
    w-[96px] h-[96px] rounded-full
    md:w-[128px] md:h-[128px]`,
};

export type AvatarProps = {
  image: ImageMeta;
};

export const Avatar: FC<AvatarProps> = ({ image }) => {
  return (
    <Image
      src={image.url}
      alt=""
      className={styles.root}
      blurDataUrl={image.blurDataUrl}
    />
  );
};
