import { css } from '~pandacss/css'
import { MdFC } from '../types'

const styles = {
  root: css({
    listStyle: 'disc',
    pl: 24,
    '&[data-ordered=true]': {
      listStyle: 'decimal',
    },
  }),
}

export const List: MdFC = ({ node, children }) => {
  const L = node.ordered ? 'ol' : 'ul'

  return (
    <L className={styles.root} data-ordered={node.ordered}>
      {children}
    </L>
  )
}
