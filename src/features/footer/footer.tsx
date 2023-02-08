import Link from 'next/link';
import { FC } from 'react';
import { LogoLabel } from '../logo';
import styles from './footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <LogoLabel height={32} />
      <Link href="/privacy">Privacy</Link>
    </footer>
  );
};
