import clsx from "clsx";
import { FC, useCallback } from "react";
import styles from "./tab.module.scss";

export type TabProps = {
  label: string;
  value: string;
  active?: boolean;
  onClick?: (value: string) => void;
};

export const Tab: FC<TabProps> = ({ label, value, active, onClick }) => {
  const onClickHandler = useCallback(() => {
    onClick?.(value);
  }, [onClick, value]);

  return (
    <div
      role="tab"
      aria-selected={active}
      tabIndex={0}
      className={clsx(styles.root, {
        [styles.active]: active,
      })}
      onClick={onClickHandler}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.indicator} />
    </div>
  );
};
