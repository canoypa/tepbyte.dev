import { MdFC } from "../types";
import styles from "./link.module.scss";

export const Link: MdFC = ({ node, children }) => {
  return (
    <a href={node.url} className={styles.root}>
      {children}
    </a>
  );
};
