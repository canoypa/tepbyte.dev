'use client';

import {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { twMerge } from '~/lib/tailwind-merge';
import { tw } from '~/lib/tw';
import { Image, ImageProps } from '../image';

const styles = {
  root: /* Tailwind */ tw`
    group/card p-4 rounded-medium bg-dark-primary/1 duration-medium-1 transition
    hover:bg-dark-primary/2
    focus-visible:bg-dark-primary/2`,
  clickable: /* Tailwind */ tw`cursor-pointer`,
  row: /* Tailwind */ tw`flex flex-row gap-6 items-center`,
  column: /* Tailwind */ tw`inline-flex gap-4 flex-col max-w-[600px]`,
  media: /* Tailwind */ tw`rounded-medium overflow-hidden
    group-data-[direction=row]/card:h-[80px] group-data-[direction=row]/card:aspect-square
    group-data-[direction=row]/card:sm:h-[80px] group-data-[direction=row]/card:sm:aspect-video
    group-data-[direction=row]/card:md:h-[120px]
    group-data-[direction=column]/card:min-h-[80px] group-data-[direction=column]/card:max-h-[200px] group-data-[direction=column]/card:aspect-video`,
  img: /* Tailwind */ tw`
    w-full h-full object-cover transition-transform duration-long-1
    group-hover/card:scale-105
    group-focus-visible/card:scale-105`,
  content: /* Tailwind */ tw`flex flex-col gap-2`,
  title: /* Tailwind */ tw`
    text-title-medium line-clamp-2 font-comfortaa
    sm:text-title-large`,
  summery: /* Tailwind */ tw`
    text-body-small line-clamp-2
    sm:text-body-medium`,
};

type InternalCardProps<T extends ElementType> = {
  as?: T;
  direction?: 'row' | 'column';
  onClick?: () => void;
  children: ReactNode;
};

export type CardProps<T extends ElementType> = InternalCardProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalCardProps<T>>;

export const Card = <T extends ElementType = 'div'>({
  as,
  direction = 'row',
  onClick,
  children,
  ...otherProps
}: CardProps<T>) => {
  const Component = as ?? 'div';

  return (
    <Component
      className={twMerge(
        styles.root,
        direction === 'row' && styles.row,
        direction === 'column' && styles.column,
        onClick !== undefined && styles.clickable
      )}
      onClick={onClick}
      data-direction={direction}
      {...otherProps}
    >
      {children}
    </Component>
  );
};

export const CardMedia: FC<ImageProps> = (props) => {
  return (
    <div className={styles.media}>
      <Image
        className={twMerge(props.className, styles.img)}
        alt=""
        {...props}
      />
    </div>
  );
};

export const CardContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export const CardTitle: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};

export const CardSummery: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.summery}>{children}</div>;
};
