import { FC } from 'react'
import { LabelData } from '~/types/parsed'
import { flex } from '~pandacss/patterns'
import { Tag } from './tag'

const styles = {
  root: flex({ gap: 8, wrap: 'wrap' }),
}

type Props = {
  tags: LabelData[]
}

export const Tags: FC<Props> = ({ tags }) => {
  return (
    <div className={styles.root}>
      {tags.map(({ label }) => (
        <Tag key={label} label={label} />
      ))}
    </div>
  )
}
