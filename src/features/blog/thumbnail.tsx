import { FC } from "react";
import { resolveImagePath } from "~/core/image_path_resolver";
import styles from "./thumbnail.module.scss";

export type ThumbnailProps = {
  image: string;
};

export const Thumbnail: FC<ThumbnailProps> = ({ image }) => {
  return (
    <img
      src={resolveImagePath("posts", image)}
      alt=""
      className={styles.root}
    />
  );
};
