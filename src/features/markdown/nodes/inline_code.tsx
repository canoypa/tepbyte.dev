import { MdFC } from "../types";
import styles from "./inline_code.module.scss";

export const InlineCode: MdFC = ({ node }) => {
  return <code className={styles.root}>{node.value}</code>;
};
