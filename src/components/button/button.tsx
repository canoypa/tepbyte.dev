import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { css, cva } from '~pandacss/css'

const styles = {
  root: cva({
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: 8,
      px: 12,
      h: 40,
      minW: 48,
      rounded: 'full',
      textStyle: 'label-large',
      fontFamily: 'comfortaa',
      color: 'dark.primary',
      fill: 'dark.primary',
      _hover: {
        backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/hover',
      },
      _focusVisible: {
        backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/focus',
      },
    },
    variants: {
      withIcon: {
        true: { px: 16 },
      },
    },
  }),
  leading: css({ w: 18, h: 18, ml: -1 }),
  trailing: css({ w: 18, h: 18, mr: -1 }),
}

type InternalButtonProps<T extends ElementType> = {
  as?: T
  label: string
  leading?: ReactNode
  trailing?: ReactNode
}

export type ButtonProps<T extends ElementType> = InternalButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalButtonProps<T>>

export const Button = <T extends ElementType = 'button'>({
  as,
  label,
  leading,
  trailing,
  ...otherProps
}: ButtonProps<T>) => {
  const props: Record<string, unknown> = {}

  const Component = as ?? 'button'

  if (Component === 'button') {
    props['type'] = 'button'
  }

  return (
    <Component
      className={styles.root({ withIcon: Boolean(leading || trailing) })}
      {...props}
      {...otherProps}
    >
      {leading && <span className={styles.leading}>{leading}</span>}
      <span>{label}</span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </Component>
  )
}
