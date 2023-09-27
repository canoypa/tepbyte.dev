import { FC } from 'react';
import { StyledLink } from '~/components/styled_link';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`mx-4 px-2 py-6 border-t-[1px] border-t-dark-outline-variant text-dark-on-surface-variant text-body-small`,
};

export const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <span>このサイトは Google Analytics を使用しています。詳しくは </span>
      <StyledLink href="https://policies.google.com/technologies/partner-sites">
        Google のサービスを使用するサイトやアプリから収集した情報の Google
        による使用
      </StyledLink>
      <span> をご覧ください。</span>
    </footer>
  );
};
