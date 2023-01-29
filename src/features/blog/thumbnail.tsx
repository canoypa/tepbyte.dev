import { FC } from "react";
import { ImageMeta } from "~/types/parsed";
import styles from "./thumbnail.module.scss";

export type ThumbnailProps = {
  image: ImageMeta;
};

export const Thumbnail: FC<ThumbnailProps> = ({ image }) => {
  return (
    <div className={styles.root}>
      <img src={image.url} alt="" className={styles.img} />

      {image.attribution && (
        <i className={styles.attribution}>
          <span>Photo by </span>
          <a href={image.attribution.user_url}>{image.attribution.user_name}</a>
          <span> on </span>
          <a href={image.attribution.site_url}>{image.attribution.site_name}</a>
        </i>
      )}
    </div>
  );
};
