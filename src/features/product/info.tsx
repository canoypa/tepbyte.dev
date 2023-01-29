import { FC } from "react";
import { ProductMeta } from "~/types/parsed";
import { PageHeadline } from "../page_headline";
import styles from "./info.module.scss";
import { Link } from "./link";

export type InfoProps = {
  product: ProductMeta;
};

export const Info: FC<InfoProps> = ({ product }) => {
  return (
    <div className={styles.root}>
      <PageHeadline title={product.title} subhead={product.subhead} />
      <Link links={product.links} />
    </div>
  );
};
