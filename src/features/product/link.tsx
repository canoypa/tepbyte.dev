import { default as NextLink } from "next/link";
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
      {links.homepage && (
        <NextLink href={links.homepage}>
          <Chip label="Home Page" />
        </NextLink>
      )}
      {links.play_store && (
        <NextLink href={links.play_store}>
          <Chip label="Google Play" />
        </NextLink>
      )}
      {links.app_store && (
        <NextLink href={links.app_store}>
          <Chip label="App Store" />
        </NextLink>
      )}
      {links.repository && (
        <NextLink href={links.repository}>
          <Chip label="Repository" />
        </NextLink>
      )}
    </div>
  );
};
