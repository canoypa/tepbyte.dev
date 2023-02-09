import { FC } from 'react';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    inline-flex items-center h-8 px-4 border rounded-small text-label-large font-comfortaa cursor-pointer transition-colors duration-medium-1
    hover:bg-dark-primary/hover focus:bg-dark-primary/focus`,
};

export type ChipProps = {
  label: string;
  onClick?: () => void;
};

export const Chip: FC<ChipProps> = ({ label, onClick }) => {
  return (
    <span className={styles.root} onClick={onClick}>
      {label}
    </span>
  );
};
