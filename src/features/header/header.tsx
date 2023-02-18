'use client';

import { FC } from 'react';
import { useScrollTrigger } from '~/hooks/scroll_trigger';
import { tw } from '~/lib/tw';
import { MainNavigation } from './main_navigation';

const styles = {
  root: /* Tailwind */ tw`
    group/header sticky top-0 bg-dark-surface/70 backdrop-blur-lg
    data-[floating=true]:shadow-2 z-2`,
  container: /* Tailwind */ tw`
    flex justify-center duration-short-2 ease-standard transition
    group-data-[floating=true]/header:bg-dark-primary/2`,
};

export const Header: FC = () => {
  const isFloating = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  return (
    <header className={styles.root} data-floating={isFloating}>
      <div className={styles.container}>
        <MainNavigation />
      </div>
    </header>
  );
};
