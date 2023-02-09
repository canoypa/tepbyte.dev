import Link from 'next/link';
import { FC } from 'react';
import { Chip } from '~/components/chip';
import { tw } from '~/lib/tw';
import { LinkData } from '~/types/parsed';

const styles = {
  root: /* Tailwind */ tw`flex gap-2`,
};

export type ProfileLinkProps = {
  links: LinkData[];
};

export const ProfileLink: FC<ProfileLinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      {links.map(({ label, url }) => (
        <Link key={url} href={url}>
          <Chip label={label} />
        </Link>
      ))}
    </div>
  );
};
