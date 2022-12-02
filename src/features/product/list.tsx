import Link from "next/link";
import { FC } from "react";
import { Card } from "~/components/card";
import styles from "./list.module.scss";

export type ProductListProps = {
  items: any[];
};

export const ProductList: FC<ProductListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v) => (
        <Link key={v.id} href={`/products/${v.id}`} className={styles.link}>
          <Card
            direction="column"
            title={v.title}
            summery={v.subhead}
            media={v.images.at(0)}
          />
        </Link>
      ))}
    </div>
  );
};
