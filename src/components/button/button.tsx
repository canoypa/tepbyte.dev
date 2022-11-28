import { FC, ReactNode } from "react";
import styles from "./button.module.scss";

export type ButtonProps = {
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export const Button: FC<ButtonProps> = ({ label, leading, trailing }) => {
  return (
    <button type="button" className={styles.root}>
      {leading && <span className={styles.leading}>{leading}</span>}
      <span>{label}</span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </button>
  );
};
