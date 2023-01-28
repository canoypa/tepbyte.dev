import { FC } from "react";
import { ProfileMeta } from "~/types/parsed";
import { Avatar } from "./avatar";
import styles from "./profile.module.scss";
import { ProfileLink } from "./profile_link";

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
