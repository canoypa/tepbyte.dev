import Link from "next/link";
import { FC } from "react";
import { Card } from "~/components/card";
import styles from "./list.module.scss";

export type BlogListProps = {
  items: any[];
};

export const BlogList: FC<BlogListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v) => (
        <Link key={v.id} href={`/blog/${v.id}`}>
          <Card title={v.title} summery={v.subhead} media={v.image} />
        </Link>
      ))}
    </div>
  );
};
