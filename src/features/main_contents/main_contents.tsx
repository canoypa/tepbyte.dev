import { FC, PropsWithChildren } from 'react'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    paddingY: 64,

    smDown: { marginX: 16 },
    smToMd: { marginX: 32 },
    mdToLg: { marginX: 'auto', maxWidth: 840 },
    lgToXl: { marginX: 200 },
    xl: { marginX: 'auto', maxWidth: 1040 },
  }),
}

export const MainContents: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <div className={styles.root}>{children}</div>
    </main>
  )
}
