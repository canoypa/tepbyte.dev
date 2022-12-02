import { FC } from "react";
import { resolveImagePath } from "~/core/image_path_resolver";
import styles from "./screenshot.module.scss";

export type ScreenshotProps = {
  images: any[];
};

export const Screenshot: FC<ScreenshotProps> = ({ images }) => {
  return (
    <div className={styles.root}>
      {images.map((v) => (
        <img
          key={v}
          src={resolveImagePath("products", v)}
          alt=""
          className={styles.image}
        />
      ))}
    </div>
  );
};
