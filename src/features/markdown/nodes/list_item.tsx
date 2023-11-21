import { css } from '~pandacss/css'
import { MdFC } from '../types'

const styles = {
  root: css({
    '&[data-task-list=true]': {
      listStyle: 'none',

      '& > p': { display: 'inline' },
    },
  }),
  checkbox: css({
    marginLeft: -4,
    marginRight: 1,
  }),
}

export const ListItem: MdFC = ({ node, children }) => {
  const isTaskListItem = node.checked !== null

  return (
    <li className={styles.root} data-task-list={isTaskListItem}>
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
  )
}
