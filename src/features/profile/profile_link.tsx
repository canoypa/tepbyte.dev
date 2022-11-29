import { FC } from "react";
import { Chip } from "~/components/chip";
import styles from "./profile_link.module.scss";

export type ProfileLinkProps = {
  links: { github: string; twitter: string; zenn: string; qiita: string };
};

export const ProfileLink: FC<ProfileLinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      <Chip label="GitHub" />
      <Chip label="Twitter" />
      <Chip label="Zenn" />
      <Chip label="Qiita" />
    </div>
  );
};
