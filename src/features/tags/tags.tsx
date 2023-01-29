import { FC } from "react";
import { LabelData } from "~/types/parsed";
import { Tag } from "./tag";
import styles from "./tags.module.scss";

type Props = {
  tags: LabelData[];
};

export const Tags: FC<Props> = ({ tags }) => {
  return (
    <div className={styles.root}>
      {tags.map(({ label }) => (
        <Tag key={label} label={label} />
      ))}
    </div>
  );
};
