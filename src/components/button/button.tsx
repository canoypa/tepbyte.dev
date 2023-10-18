import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { css, cva } from '~pandacss/css'

const styles = {
  root: cva({
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: 8,
      paddingX: 12,
      minWidth: 48,
      height: 40,
      rounded: 'full',
      textStyle: 'label-large',
      fontFamily: 'comfortaa',
      color: 'dark.primary',
      fill: 'dark.primary',

      backgroundWithAlpha_EXPERIMENTAL: {
        _hover: 'dark.primary/hover',
        _focusVisible: 'dark.primary/hover',
      },
    },
    variants: {
      withIcon: {
        true: { paddingX: 16 },
      },
    },
  }),
  leading: css({
    width: 18,
    height: 18,
    marginLeft: -1,
  }),
  trailing: css({
    width: 18,
    height: 18,
    marginRight: -1,
  }),
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
