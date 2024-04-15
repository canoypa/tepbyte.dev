import { ComponentPropsWithoutRef, ElementType } from 'react'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    display: 'inline-flex',
    alignItems: 'center',
    paddingX: 16,
    height: 32,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'dark.outline',
    rounded: 'small',
    textStyle: 'label-large',
    fontFamily: 'comfortaa',
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: 'medium-1',

    backgroundColor: {
      _hover: 'dark.primary/hover',
      _focusVisible: 'dark.primary/hover',
    },
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
