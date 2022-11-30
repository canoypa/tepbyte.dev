import Link from "next/link";
import { FC } from "react";
import { Chip } from "~/components/chip";
import styles from "./profile_link.module.scss";

export type ProfileLinkProps = {
  links: { github: string; twitter: string; zenn: string; qiita: string };
};

export const ProfileLink: FC<ProfileLinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      <Link href={links.github}>
        <Chip label="GitHub" />
      </Link>
      <Link href={links.twitter}>
        <Chip label="Twitter" />
      </Link>
      <Link href={links.zenn}>
        <Chip label="Zenn" />
      </Link>
      <Link href={links.qiita}>
        <Chip label="Qiita" />
      </Link>
    </div>
  );
};
