import clsx from 'clsx';
import { FC } from 'react';
import { useScrollTrigger } from '~/hooks/scroll_trigger';
import styles from './header.module.scss';
import { MainNavigation } from './main_navigation';

export const Header: FC = () => {
  const isFloating = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  return (
    <header
      className={clsx(styles.root, {
        [styles.floating]: isFloating,
      })}
    >
      <div className={styles.container}>
        <MainNavigation />
      </div>
    </header>
  );
};
