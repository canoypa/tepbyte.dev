import { css } from '~pandacss/css'
import { MdFC } from '../types'

const styles = {
  root: css({
    paddingX: 4,
    paddingY: 2,
    rounded: 'extra-small',
    backgroundColor: 'dark.surface-variant',
    color: 'dark.on-surface-variant',
    textStyle: 'label-large',
  }),
}

export const InlineCode: MdFC = ({ node }) => {
  return <code className={styles.root}>{node.value}</code>
}
