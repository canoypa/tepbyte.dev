import clsx from 'clsx';
import { MdFC } from '../types';
import styles from './list_item.module.scss';

export const ListItem: MdFC = ({ node, children }) => {
  const isTaskListItem = node.checked !== null;

  return (
    <li
      className={clsx(styles.root, {
        [styles.task]: isTaskListItem,
      })}
    >
      {isTaskListItem && (
        <input type="checkbox" checked={node.checked} readOnly />
      )}
      {children}
    </li>
  );
};
