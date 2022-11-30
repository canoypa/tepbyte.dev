import { FC } from "react";
import styles from "./info.module.scss";
import { Link } from "./link";

export type InfoProps = {
  product: any;
};

export const Info: FC<InfoProps> = ({ product }) => {
  return (
    <div className={styles.root}>
      <div className={styles.primary}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.subhead}>{product.subhead}</p>
      </div>
      <Link links={product} />
    </div>
  );
};
