import { FC } from "react";
import { ImageMeta } from "~/types/parsed";
import styles from "./thumbnail.module.scss";

export type ThumbnailProps = {
  image: ImageMeta;
};

export const Thumbnail: FC<ThumbnailProps> = ({ image }) => {
  return <img src={image.url} alt="" className={styles.root} />;
};
