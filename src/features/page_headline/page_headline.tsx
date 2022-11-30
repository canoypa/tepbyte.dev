import { FC, PropsWithChildren } from "react";
import styles from "./page_headline.module.scss";

export const PageHeadline: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.root}>{children}</h1>;
};
