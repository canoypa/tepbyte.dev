import { FC } from "react";
import { Tag as IconTag } from "~/components/icons/tag";
import styles from "./tag.module.scss";

type Props = {
  label: string;
};

export const Tag: FC<Props> = ({ label }) => {
  return (
    <span className={styles.root}>
      <IconTag width={16} height={16} />
      {label}
    </span>
  );
};
