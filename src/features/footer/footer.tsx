import { FC } from 'react';
import { StyledLink } from '~/components/styled_link';
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
      <p>
        このサイトは Google Analytics を使用しています。詳しくは{' '}
        <StyledLink href="https://policies.google.com/technologies/partner-sites">
          Google のサービスを使用するサイトやアプリから収集した情報の Google
          による使用
        </StyledLink>{' '}
        をご覧ください。
      </p>
    </footer>
  );
};
