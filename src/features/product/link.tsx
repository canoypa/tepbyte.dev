import { default as NextLink } from "next/link";
import { FC } from "react";
import { Chip } from "~/components/chip";
import { LinkData } from "~/types/parsed";
import styles from "./link.module.scss";

export type LinkProps = {
  links: LinkData[];
};

export const Link: FC<LinkProps> = ({ links }) => {
  return (
    <div className={styles.root}>
      {links.map(({ label, url }) => (
        <NextLink key={url} href={url}>
          <Chip label={label} />
        </NextLink>
      ))}
    </div>
  );
};
