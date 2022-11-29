import { FC } from "react";
import { Card } from "~/components/card";
import styles from "./list.module.scss";

export type BlogListProps = {
  items: any[];
};

export const BlogList: FC<BlogListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v, i) => (
        <Card key={i} title={v.title} summery={v.subhead} media={v.image} />
      ))}
    </div>
  );
};
