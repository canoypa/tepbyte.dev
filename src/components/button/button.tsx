import { FC, ReactNode } from 'react';
import { twMerge } from '~/lib/tailwind-merge';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    inline-flex items-center justify-center gap-x-2 px-3 h-[40px] min-w-[48px] rounded-full text-label-large font-comfortaa text-dark-primary fill-dark-primary
    hover:bg-dark-primary/hover
    focus:bg-dark-primary/focus`,
  withIcon: /* Tailwind */ tw`px-4`,
  leading: /* Tailwind */ tw`w-[18px] h-[18px] -ml-1`,
  trailing: /* Tailwind */ tw`w-[18px] h-[18px] -mr-1`,
};

export type ButtonProps = {
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export const Button: FC<ButtonProps> = ({ label, leading, trailing }) => {
  return (
    <button
      type="button"
      className={twMerge(
        styles.root,
        Boolean(leading || trailing) && styles.withIcon
      )}
    >
      {leading && <span className={styles.leading}>{leading}</span>}
      <span>{label}</span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </button>
  );
};
