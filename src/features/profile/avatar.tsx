import { FC } from 'react';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    w-[96px] h-[96px] rounded-full
    md:w-[128px] md:h-[128px]`,
};

export type AvatarProps = {
  photo: string;
};

export const Avatar: FC<AvatarProps> = ({ photo }) => {
  return <img src={photo} alt="" className={styles.root} />;
};
