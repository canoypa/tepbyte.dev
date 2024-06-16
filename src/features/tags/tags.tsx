import type { FC } from 'react'
import { flex } from '~pandacss/patterns'
import { Tag } from './tag'

const styles = {
  root: flex({ gap: 8, wrap: 'wrap' }),
}

type Props = {
  tags: string[]
}

export const Tags: FC<Props> = ({ tags }) => {
  return (
    <div className={styles.root}>
      {tags.map((label) => (
        <Tag key={label} label={label} />
      ))}
    </div>
  )
}
