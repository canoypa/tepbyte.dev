import { FC, PropsWithChildren } from 'react'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'flex',
    flexDirection: 'column',
    py: 32,
    gap: 32,
    smDown: { mx: 16 },
    smToMd: { mx: 32 },
    mdToLg: { mx: 'auto', maxW: 840 },
    lgToXl: { mx: 200 },
    xl: { mr: 'auto', ml: 'auto', maxW: 1040 },
  }),
}

export const MainContents: FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.root}>{children}</main>
}
