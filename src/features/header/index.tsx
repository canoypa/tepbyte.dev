import { FC } from "react";
import { MainNavigation } from "../main_navigation";
import styles from "./header.module.scss";

export const Header: FC = () => {
  return (
    <header className={styles.root}>
      <MainNavigation />
    </header>
  );
};
