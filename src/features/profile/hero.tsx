import Link from 'next/link';
import { FC } from 'react';
import { Button } from '~/components/button';
import { NavigateNext } from '~/components/icons/navigate_next';
import { tw } from '~/lib/tw';
import { ProfileMeta } from '~/types/parsed';
import { ProfileCard } from './card';
import { ProfileLink } from './profile_link';

const styles = {
  root: /* Tailwind */ tw`
    flex flex-col px-8 py-16 gap-16 items-center
    md:flex-row`,
  card: /* Tailwind */ tw`flex justify-center`,
  info: /* Tailwind */ tw`flex flex-col gap-8`,
  subhead: /* Tailwind */ tw`
    text-headline-small font-comfortaa
    md:text-headline-medium`,
};

export type HeroProps = {
  profile: ProfileMeta;
};

export const Hero: FC<HeroProps> = ({ profile }) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <ProfileCard
          name={profile.name}
          photo={profile.photo}
          image={profile.background}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.subhead}>{profile.subhead}</span>
        <ProfileLink links={profile.links} />
        <span>
          <Button
            as={Link}
            href="/about"
            label="See full profile"
            trailing={<NavigateNext />}
          />
        </span>
      </div>
    </div>
  );
};
