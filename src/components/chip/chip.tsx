import { FC } from "react";
import styles from "./chip.module.scss";

export type ChipProps = {
  label: string;
  onClick?: () => void;
};

export const Chip: FC<ChipProps> = ({ label, onClick }) => {
  return (
    <span className={styles.root} onClick={onClick}>
      {label}
    </span>
  );
};
