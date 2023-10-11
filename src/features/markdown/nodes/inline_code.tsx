import { tw } from '~/lib/tw'
import { MdFC } from '../types'

const styles = {
  root: /* Tailwind */ tw`px-1 py-0.5 rounded-extra-small bg-dark-surface-variant text-dark-on-surface-variant text-label-large`,
}

export const InlineCode: MdFC = ({ node }) => {
  return <code className={styles.root}>{node.value}</code>
}
