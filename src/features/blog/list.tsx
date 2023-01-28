import Link from "next/link";
import { FC } from "react";
import { Card } from "~/components/card";
import { ArticleMeta } from "~/types/parsed";
import styles from "./list.module.scss";

export type BlogListProps = {
  items: Array<ArticleMeta & { slug: string }>;
};

export const BlogList: FC<BlogListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v) => (
        <Link key={v.slug} href={`/blog/${v.slug}`}>
          <Card title={v.title} summery={v.subhead} media={v.image.url} />
        </Link>
      ))}
    </div>
  );
};
