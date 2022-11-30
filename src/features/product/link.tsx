import { FC } from "react";
import { Chip } from "~/components/chip";
import styles from "./link.module.scss";

export type LinkProps = {
  links: {
    homepage: string;
    play_store: string;
    app_store: string;
    repository: string;
  };
};

export const Link: FC<LinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      {links.homepage && <Chip label="Home Page" />}
      {links.play_store && <Chip label="Google Play" />}
      {links.app_store && <Chip label="App Store" />}
      {links.repository && <Chip label="Repository" />}
    </div>
  );
};
