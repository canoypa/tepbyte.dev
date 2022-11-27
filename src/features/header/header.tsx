import { FC } from "react";
import styles from "./header.module.scss";
import { MainNavigation } from "./main_navigation";

export const Header: FC = () => {
  return (
    <header className={styles.root}>
      <MainNavigation />
    </header>
  );
};
