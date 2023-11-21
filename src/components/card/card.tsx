'use client'

import {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  PropsWithChildren,
  ReactNode,
} from 'react'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'
import { Image, ImageProps } from '../image'

const styles = {
  root: css({
    p: 16,
    rounded: 'medium',
    backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/1',
    transitionProperty: 'background-color',
    transitionDuration: 'medium-1',

    '&[data-clickable=true]': { cursor: 'pointer' },

    _hover: { backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/2' },
    _focusVisible: { backgroundWithAlpha_EXPERIMENTAL: 'dark.primary/2' },

    _horizontal: {
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      alignItems: 'center',
    },
    _vertical: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 16,
      maxWidth: 600,
    },
  }),
  media: css({
    rounded: 'medium',
    overflow: 'hidden',

    _groupHorizontal: {
      h: { base: 80, md: 120 },
      aspectRatio: { base: 'square', sm: '16/9' },
    },
    _groupVertical: {
      minH: 80,
      maxH: 200,
      aspectRatio: '16/9',
    },
  }),
  img: css({
    w: '100%',
    h: '100%',
    objectFit: 'cover',
    transitionProperty: 'transform',
    transitionDuration: 'long-1',

    _groupHover: { transform: 'scale(1.05)' },
    _groupFocusVisible: { transform: 'scale(1.05)' },
  }),
  content: flex({ direction: 'column', gap: 8 }),
  title: css({
    display: '-webkit-box',
    //@ts-expect-error ある
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    overflow: 'hidden',
    textStyle: { base: 'title-medium', sm: 'title-large' },
    fontFamily: 'comfortaa',
  }),
  summery: css({
    display: '-webkit-box',
    //@ts-expect-error ある
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    overflow: 'hidden',
    textStyle: { base: 'body-small', sm: 'body-medium' },
  }),
}

type InternalCardProps<T extends ElementType> = {
  as?: T
  direction?: 'row' | 'column'
  onClick?: () => void
  children: ReactNode
}

export type CardProps<T extends ElementType> = InternalCardProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalCardProps<T>>

export const Card = <T extends ElementType = 'div'>({
  as,
  direction = 'row',
  onClick,
  children,
  ...otherProps
}: CardProps<T>) => {
  const Component = as ?? 'div'

  return (
    <Component
      className={['group', styles.root].join(' ')}
      onClick={onClick}
      data-orientation={direction === 'row' ? 'horizontal' : 'vertical'}
      data-clickable={onClick !== undefined}
      {...otherProps}
    >
      {children}
    </Component>
  )
}

export const CardMedia: FC<ImageProps> = (props) => {
  return (
    <div className={styles.media}>
      <Image
        className={[props.className, styles.img].join(' ')}
        alt=""
        {...props}
      />
    </div>
  )
}

export const CardContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>
}

export const CardTitle: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.title}>{children}</div>
}

export const CardSummery: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.summery}>{children}</div>
}
