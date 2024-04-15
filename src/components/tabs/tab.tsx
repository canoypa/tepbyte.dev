'use client'

import { ComponentPropsWithoutRef, ElementType, useCallback } from 'react'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'

const styles = {
  root: css({
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 64,
    height: 48,
    paddingX: 16,
    cursor: 'pointer',
    textStyle: 'label-large',
    fontFamily: 'comfortaa',

    backgroundColor: {
      _hover: 'dark.primary/hover',
      _focusVisible: 'dark.primary/hover',
    },
  }),
  label: flex({
    grow: 1,

    alignItems: 'center',
  }),
  indicator: css({
    width: '50%',
    height: 3,
    roundedTop: 'full',
    backgroundColor: 'dark.primary',
    transitionProperty: 'transform',
    transitionTimingFunction: 'standard',
    transitionDuration: 'short-4',
    transform: 'scaleY(0)',
    transformOrigin: 'bottom',

    '&[data-selected=true]': {
      transform: 'scaleY(1)',
    },
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
      <span className={styles.indicator} data-selected={active} />
    </Component>
  )
}
