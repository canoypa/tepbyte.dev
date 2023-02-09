import { FC, PropsWithChildren } from 'react';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    flex flex-col py-8 gap-8
    max-sm:mx-[16px] sm:max-md:mx-[32px]
    md:max-lg:mx-auto md:max-lg:max-w-[840px]
    lg:max-xl:mx-[200px] xl:mx-auto
    xl:max-w-[1040px]`,
};

export const MainContents: FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.root}>{children}</main>;
};
