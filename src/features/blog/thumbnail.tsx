import { FC } from "react";
import styles from "./thumbnail.module.scss";

export type ThumbnailProps = {
  image: string;
};

export const Thumbnail: FC<ThumbnailProps> = ({ image }) => {
  return <img src={image} alt="" className={styles.root} />;
};
