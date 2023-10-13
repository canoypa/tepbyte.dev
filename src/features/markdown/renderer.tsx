import { FC } from 'react'
import { flex } from '~pandacss/patterns'
import { components } from './nodes'

const styles = {
  root: flex({ direction: 'column', rowGap: 16 }),
}

export type MarkdownRendererProps = {
  tree: any
}

const RenderTree: FC<MarkdownRendererProps> = ({ tree }) => {
  const Component = components[tree.type]

  if (typeof Component === 'undefined') return null

  if (tree.children) {
    return (
      <Component node={tree}>
        {tree.children.map((child: any, index: number) => (
          <RenderTree key={index} tree={child} />
        ))}
      </Component>
    )
  }

  return <Component node={tree} />
}

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ tree }) => {
  return (
    <div className={styles.root}>
      <RenderTree tree={tree} />
    </div>
  )
}
