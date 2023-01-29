import { FC } from "react";
import styles from "./page_headline.module.scss";

type Props = {
  title: string;
  subhead?: string;
};
export const PageHeadline: FC<Props> = ({ title, subhead }) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {subhead && <p className={styles.subhead}>{subhead}</p>}
    </div>
  );
};
