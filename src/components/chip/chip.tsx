import { ComponentPropsWithoutRef, ElementType } from 'react'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'inline-flex',
    alignItems: 'center',
    h: 32,
    px: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'dark.outline',
    rounded: 'small',
    textStyle: 'label-large',
    fontFamily: 'comfortaa',
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: 'medium-1',
    _hover: { backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/hover' },
    _focusVisible: { backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/focus' },
  }),
}

type InternalChipProps<T extends ElementType> = {
  as?: T
  label: string
  onClick?: () => void
}

export type ChipProps<T extends ElementType> = InternalChipProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalChipProps<T>>

export const Chip = <T extends ElementType = 'span'>({
  as,
  label,
  onClick,
  ...otherProps
}: ChipProps<T>) => {
  const Component = as ?? 'span'

  return (
    <Component className={styles.root} onClick={onClick} {...otherProps}>
      {label}
    </Component>
  )
}
