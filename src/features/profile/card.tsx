import { FC } from 'react';
import { tw } from '~/lib/tw';
import { ImageMeta } from '~/types/parsed';
import { Avatar } from './avatar';

const styles = {
  root: /* Tailwind */ tw`
    inline-grid grid-cols-1 grid-rows-1 h-[300px] aspect-square rounded-extra-large overflow-hidden
    md:h-[400px] md:aspect-[3/4]`,
  image: /* Tailwind */ tw`row-span-full col-span-full brightness-[0.4]`,
  img: /* Tailwind */ tw`w-full h-full object-cover`,
  content: /* Tailwind */ tw`flex flex-col gap-8 items-center justify-center row-span-full col-span-full backdrop-blur-lg`,
  name: /* Tailwind */ tw`
    text-display-small font-comfortaa
    md:text-display-medium`,
};

export type ProfileCardProps = {
  name: string;
  photo: ImageMeta;
  image: ImageMeta;
};

export const ProfileCard: FC<ProfileCardProps> = ({ name, photo, image }) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={image.url} alt="" className={styles.img} />
      </div>
      <div className={styles.content}>
        <Avatar photo={photo.url} />
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
};
