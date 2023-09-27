import { FC } from 'react'
import { tw } from '~/lib/tw'
import { LabelData } from '~/types/parsed'
import { Tag } from './tag'

const styles = {
  root: /* Tailwind */ tw`flex gap-2 flex-wrap`,
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
