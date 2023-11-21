import { cva } from '~pandacss/css'
import { MdFC } from '../types'

const styles = cva({
  variants: {
    depth: {
      1: { textStyle: 'headline-large' },
      2: { textStyle: 'headline-medium' },
      3: { textStyle: 'headline-small' },
      4: { textStyle: 'title-large' },
      5: { textStyle: 'title-medium' },
      6: { textStyle: 'title-small' },
    },
  },
})

export const Heading: MdFC = ({ node, children }) => {
  const H = (
    node.depth <= 3 ? `h${node.depth}` : 'p'
  ) as keyof JSX.IntrinsicElements

  return <H className={styles({ depth: node.depth })}>{children}</H>
}
