import { FC } from "react";
import { ImageMeta } from "~/types/parsed";
import { Avatar } from "./avatar";
import styles from "./card.module.scss";

export type ProfileCardProps = {
  name: string;
  photo: ImageMeta;
  image: ImageMeta;
};

export const ProfileCard: FC<ProfileCardProps> = ({ name, photo, image }) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={image.url} alt="" className={styles.img} />
      </div>
      <div className={styles.content}>
        <Avatar photo={photo.url} />
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
};
