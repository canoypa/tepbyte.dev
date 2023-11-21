import { FC } from 'react'
import { Tag as IconTag } from '~/components/icons/tag'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    columnGap: 2,
    height: 24,
    paddingLeft: 6,
    paddingRight: 8,
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
