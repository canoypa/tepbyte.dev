import { FC } from "react";
import { resolveImagePath } from "~/core/image_path_resolver";
import { Avatar } from "./avatar";
import styles from "./card.module.scss";

export type ProfileCardProps = {
  name: string;
  photo: string;
  image: string;
};

export const ProfileCard: FC<ProfileCardProps> = ({ name, photo, image }) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img
          src={resolveImagePath("profile", image)}
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.content}>
        <Avatar photo={photo} />
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
};
