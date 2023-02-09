import Link from 'next/link';
import { FC } from 'react';
import { tw } from '~/lib/tw';
import { LogoLabel } from '../logo';

const styles = {
  root: /* Tailwind */ tw`
    flex items-center gap-x-4 px-6 py-8 text-dark-on-surface-variant fill-dark-on-surface-variant font-comfortaa text-body-medium
    md:gap-x-8 md:px-16 md:py-12`,
};

export const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <LogoLabel height={32} />
      <Link href="/privacy">Privacy</Link>
    </footer>
  );
};
