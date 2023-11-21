import { FC } from 'react'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({ direction: 'column', rowGap: 8 }),
  title: css({ textStyle: 'display-medium', fontFamily: 'comfortaa' }),
  subhead: css({ textStyle: 'title-medium' }),
}

type Props = {
  title: string
  subhead?: string
}
export const PageHeadline: FC<Props> = ({ title, subhead }) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {subhead && <p className={styles.subhead}>{subhead}</p>}
    </div>
  )
}
