'use client'

import { FC } from 'react'
import { useScrollTrigger } from '~/hooks/scroll_trigger'
import { css } from '~pandacss/css'
import { MainNavigation } from './main_navigation'

const styles = {
  root: css({
    position: 'sticky',
    top: 0,
    backgroundWithAlpha_EXPERIMENTAL: 'dark.surface/0.7',
    backdropFilter: 'blur(16px)',
    '&[data-floating=true]': {
      zIndex: 3,
    },
  }),
  container: css({
    display: 'flex',
    justifyContent: 'center',
    transitionDuration: 'short-2',
    transitionTimingFunction: 'standard',
    transition: 'transform',
    '[data-floating=true] &': {
      backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/2',
    },
  }),
}

export const Header: FC = () => {
  const isFloating = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  })

  return (
    <header className={styles.root} data-floating={isFloating}>
      <div className={styles.container}>
        <MainNavigation />
      </div>
    </header>
  )
}
