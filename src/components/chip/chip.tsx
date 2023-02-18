import { ComponentPropsWithoutRef, ElementType } from 'react';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    inline-flex items-center h-8 px-4 border rounded-small text-label-large font-comfortaa cursor-pointer transition-colors duration-medium-1
    hover:bg-dark-primary/hover
    focus-visible:bg-dark-primary/focus`,
};

type InternalChipProps<T extends ElementType> = {
  as?: T;
  label: string;
  onClick?: () => void;
};

export type ChipProps<T extends ElementType> = InternalChipProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalChipProps<T>>;

export const Chip = <T extends ElementType = 'span'>({
  as,
  label,
  onClick,
  ...otherProps
}: ChipProps<T>) => {
  const Component = as ?? 'span';

  return (
    <Component className={styles.root} onClick={onClick} {...otherProps}>
      {label}
    </Component>
  );
};
