import { FC } from "react";
import styles from "./avatar.module.scss";

export type AvatarProps = {
  photo: string;
};

export const Avatar: FC<AvatarProps> = ({ photo }) => {
  return <img src={photo} alt="" className={styles.root} />;
};
