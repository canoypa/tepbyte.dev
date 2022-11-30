import { FC } from "react";
import { resolveImagePath } from "~/core/image_path_resolver";
import styles from "./avatar.module.scss";

export type AvatarProps = {
  photo: string;
};

export const Avatar: FC<AvatarProps> = ({ photo }) => {
  return (
    <img
      src={resolveImagePath("profile", photo)}
      alt=""
      className={styles.root}
    />
  );
};
