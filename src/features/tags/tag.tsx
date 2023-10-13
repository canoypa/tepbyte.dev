import { FC } from 'react'
import { Tag as IconTag } from '~/components/icons/tag'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'flex',
    columnGap: 2,
    h: 24,
    pl: 6,
    pr: 8,
    alignItems: 'center',
    rounded: 'full',
    backgroundColor: 'dark.secondary-container',
    color: 'dark.on-secondary-container',
    fill: 'dark.on-secondary-container',
    textStyle: 'label-medium',
    fontFamily: 'comfortaa',
  }),
}

type Props = {
  label: string
}

export const Tag: FC<Props> = ({ label }) => {
  return (
    <span className={styles.root}>
      <IconTag width={16} height={16} />
      {label}
    </span>
  )
}
