import clsx from 'clsx';
import { MdFC } from '../types';
import styles from './list.module.scss';

export const List: MdFC = ({ node, children }) => {
  const L = node.ordered ? 'ol' : 'ul';

  return (
    <L
      className={clsx(styles.root, {
        [styles.ordered]: node.ordered,
      })}
    >
      {children}
    </L>
  );
};
