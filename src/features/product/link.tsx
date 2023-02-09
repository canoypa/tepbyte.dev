import { default as NextLink } from 'next/link';
import { FC } from 'react';
import { Chip } from '~/components/chip';
import { tw } from '~/lib/tw';
import { LinkData } from '~/types/parsed';

const styles = {
  root: /* Tailwind */ tw`flex gap-2`,
};

export type LinkProps = {
  links: LinkData[];
};

export const Link: FC<LinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      {links.map(({ label, url }) => (
        <Chip key={url} as={NextLink} href={url} label={label} />
      ))}
    </div>
  );
};
