import { twMerge } from '~/lib/tailwind-merge'
import { tw } from '~/lib/tw'
import { MdFC } from '../types'

const styles = {
  root: /* Tailwind */ tw`list-disc pis-6`,
  ordered: /* Tailwind */ tw`list-decimal`,
}

export const List: MdFC = ({ node, children }) => {
  const L = node.ordered ? 'ol' : 'ul'

  return (
    <L className={twMerge(styles.root, node.ordered && styles.ordered)}>
      {children}
    </L>
  )
}
