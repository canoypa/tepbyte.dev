import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { twMerge } from '~/lib/tailwind-merge';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    inline-flex items-center justify-center gap-x-2 px-3 h-[40px] min-w-[48px] rounded-full text-label-large font-comfortaa text-dark-primary fill-dark-primary
    hover:bg-dark-primary/hover
    focus-visible:bg-dark-primary/focus`,
  withIcon: /* Tailwind */ tw`px-4`,
  leading: /* Tailwind */ tw`w-[18px] h-[18px] -ml-1`,
  trailing: /* Tailwind */ tw`w-[18px] h-[18px] -mr-1`,
};

type InternalButtonProps<T extends ElementType> = {
  as?: T;
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export type ButtonProps<T extends ElementType> = InternalButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalButtonProps<T>>;

export const Button = <T extends ElementType = 'button'>({
  as,
  label,
  leading,
  trailing,
  ...otherProps
}: ButtonProps<T>) => {
  const props: Record<string, unknown> = {};

  const Component = as ?? 'button';

  if (Component === 'button') {
    props['type'] = 'button';
  }

  return (
    <Component
      className={twMerge(
        styles.root,
        Boolean(leading || trailing) && styles.withIcon
      )}
      {...props}
      {...otherProps}
    >
      {leading && <span className={styles.leading}>{leading}</span>}
      <span>{label}</span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </Component>
  );
};
