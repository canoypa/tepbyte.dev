'use client'

import { ComponentPropsWithoutRef, ElementType, useCallback } from 'react'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'

const styles = {
  root: css({
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    h: 48,
    minW: 64,
    px: 16,
    cursor: 'pointer',
    textStyle: 'label-large',
    fontFamily: 'comfortaa',
    _hover: {
      backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/hover',
    },
    _focusVisible: {
      backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/focus',
    },
  }),
  label: flex({ grow: 1, alignItems: 'center' }),
  indicator: css({
    h: 3,
    w: '50%',
    roundedTopRight: 'full',
    roundedTopLeft: 'full',
    backgroundColor: 'dark.primary',
    transitionProperty: 'transform',
    transitionDuration: 'short-4',
    transitionTimingFunction: 'standard',
    transformOrigin: 'bottom',
    transform: 'scaleY(0)',
    _active: { transform: 'scaleY(1)' },
  }),
}

type InternalTabProps<T extends ElementType> = {
  as?: T
  label: string
  value: string
  active?: boolean
  onClick?: (value: string) => void
}

export type TabProps<T extends ElementType> = InternalTabProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalTabProps<T>>

export const Tab = <T extends ElementType = 'span'>({
  as,
  label,
  value,
  active,
  onClick,
  ...otherProps
}: TabProps<T>) => {
  const Component = as ?? 'span'

  const onClickHandler = useCallback(() => {
    onClick?.(value)
  }, [onClick, value])

  return (
    <Component
      role="tab"
      aria-selected={active}
      tabIndex={0}
      className={styles.root}
      onClick={onClickHandler}
      {...otherProps}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.indicator} data-active={active} />
    </Component>
  )
}
