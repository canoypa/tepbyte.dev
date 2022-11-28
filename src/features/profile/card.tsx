import { FC } from "react";
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
        <img src={image} alt="" className={styles.img} />
      </div>
      <div className={styles.content}>
        <Avatar photo={photo} />
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
};
