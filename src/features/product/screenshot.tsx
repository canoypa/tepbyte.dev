import { FC } from "react";
import { ImageMeta } from "~/types/parsed";
import styles from "./screenshot.module.scss";

export type ScreenshotProps = {
  images: ImageMeta[];
};

export const Screenshot: FC<ScreenshotProps> = ({ images }) => {
  return (
    <div className={styles.root}>
      {images.map((v) => (
        <img key={v.url} src={v.url} alt="" className={styles.image} />
      ))}
    </div>
  );
};
