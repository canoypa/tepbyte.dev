import { FC, ReactElement } from 'react';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`flex`,
};

export type TabItemType = {
  label: string;
  value: string;
};

export type TabsProps = {
  items: TabItemType[];
  renderItem: (item: TabItemType) => ReactElement;
};

export const Tabs: FC<TabsProps> = ({ items, renderItem }) => {
  return (
    <div role="tablist" className={styles.root}>
      {items.map((item) => renderItem(item))}
    </div>
  );
};
