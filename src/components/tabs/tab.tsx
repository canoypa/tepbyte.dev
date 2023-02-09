import { FC, useCallback } from 'react';
import { twMerge } from '~/lib/tailwind-merge';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    inline-flex flex-col items-center h-[48px] min-w-[64px] px-[16px] cursor-pointer text-label-large font-comfortaa
    hover:bg-dark-primary/hover
    focus:bg-dark-primary/focus`,
  label: /* Tailwind */ tw`flex-grow flex items-center`,
  indicator: /* Tailwind */ tw`h-[3px] w-1/2 rounded-tr-full rounded-tl-full bg-dark-primary transition-transform duration-short-4 ease-standard origin-bottom scale-y-0`,
  active: /* Tailwind */ tw`scale-y-100`,
};

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
      className={styles.root}
      onClick={onClickHandler}
    >
      <span className={styles.label}>{label}</span>
      <span className={twMerge(styles.indicator, active && styles.active)} />
    </div>
  );
};
