import { twMerge } from '~/lib/tailwind-merge';
import { tw } from '~/lib/tw';
import { MdFC } from '../types';

const styles = {
  task: /* Tailwind */ tw`
    list-none
    [&>p]:inline`,
  checkbox: /* Tailwind */ tw`-ml-4 mr-1`, // TODO: margin-inline-start/end
};

export const ListItem: MdFC = ({ node, children }) => {
  const isTaskListItem = node.checked !== null;

  return (
    <li className={twMerge(isTaskListItem && styles.task)}>
      {isTaskListItem && (
        <input
          type="checkbox"
          checked={node.checked}
          readOnly
          className={styles.checkbox}
        />
      )}
      {children}
    </li>
  );
};
