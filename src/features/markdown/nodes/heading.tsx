import { twMerge } from '~/lib/tailwind-merge'
import { tw } from '~/lib/tw'
import { MdFC } from '../types'

const styles = {
  d1: /* Tailwind */ tw`text-headline-large`,
  d2: /* Tailwind */ tw`text-headline-medium`,
  d3: /* Tailwind */ tw`text-headline-small`,
  d4: /* Tailwind */ tw`text-title-large`,
  d5: /* Tailwind */ tw`text-title-medium`,
  d6: /* Tailwind */ tw`text-title-small`,
}

export const Heading: MdFC = ({ node, children }) => {
  const H = (
    node.depth <= 3 ? `h${node.depth}` : 'p'
  ) as keyof JSX.IntrinsicElements

  return (
    <H
      className={twMerge(
        node.depth === 1 && styles.d1,
        node.depth === 2 && styles.d2,
        node.depth === 3 && styles.d3,
        node.depth === 4 && styles.d4,
        node.depth === 5 && styles.d5,
        node.depth === 6 && styles.d6,
      )}
    >
      {children}
    </H>
  )
}
