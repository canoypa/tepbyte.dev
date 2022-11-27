import { FC, useCallback } from "react";
import { Tab } from "./tab";
import styles from "./tabs.module.scss";

export type TabItemType = {
  label: string;
  value: string;
};

export type TabsProps = {
  items: TabItemType[];
  active?: string;
  onChange?: (value: string) => void;
};

export const Tabs: FC<TabsProps> = ({ items, active: active, onChange }) => {
  const onClickHandler = useCallback(
    (value: string) => {
      onChange?.(value);
    },
    [onChange]
  );

  return (
    <div role="tablist" className={styles.root}>
      {items.map((item, index) => (
        <Tab
          key={index}
          label={item.label}
          value={item.value}
          active={active === item.value}
          onClick={onClickHandler}
        />
      ))}
    </div>
  );
};
