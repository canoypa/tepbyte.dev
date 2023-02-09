import { FC } from 'react';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`flex flex-col gap-y-2`,
  title: /* Tailwind */ tw`text-display-medium font-comfortaa`,
  subhead: /* Tailwind */ tw`text-title-medium`,
};

type Props = {
  title: string;
  subhead?: string;
};
export const PageHeadline: FC<Props> = ({ title, subhead }) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {subhead && <p className={styles.subhead}>{subhead}</p>}
    </div>
  );
};
