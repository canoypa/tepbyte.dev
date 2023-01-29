import Link from "next/link";
import { FC } from "react";
import { Card } from "~/components/card";
import { ProductMeta } from "~/types/parsed";
import styles from "./list.module.scss";

export type ProductListProps = {
  items: Array<ProductMeta & { slug: string }>;
};

export const ProductList: FC<ProductListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v) => (
        <Link key={v.slug} href={`/products/${v.slug}`} className={styles.link}>
          <Card
            direction="column"
            title={v.title}
            summery={v.subhead}
            media={v.images[0].url}
          />
        </Link>
      ))}
    </div>
  );
};
