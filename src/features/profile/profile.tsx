import { FC } from 'react';
import { tw } from '~/lib/tw';
import { ProfileMeta } from '~/types/parsed';
import { Avatar } from './avatar';
import { ProfileLink } from './profile_link';

const styles = {
  root: /* Tailwind */ tw`flex flex-col gap-6`,
  primary: /* Tailwind */ tw`flex gap-6 items-center`,
  name: /* Tailwind */ tw`text-headline-large font-comfortaa`,
  subhead: /* Tailwind */ tw`text-title-medium font-comfortaa`,
};

export type ProfileProps = {
  profile: ProfileMeta;
};

export const Profile: FC<ProfileProps> = ({ profile }) => {
  return (
    <div className={styles.root}>
      <div className={styles.primary}>
        <Avatar photo={profile.photo.url} />
        <span className={styles.name}>{profile.name}</span>
      </div>
      <div className={styles.subhead}>{profile.subhead}</div>
      <ProfileLink links={profile.links} />
    </div>
  );
};
