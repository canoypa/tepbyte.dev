'use client';

import { ComponentPropsWithoutRef, ElementType } from 'react';
import { twMerge } from '~/lib/tailwind-merge';
import { tw } from '~/lib/tw';

const styles = {
  root: /* Tailwind */ tw`
    group/card p-4 rounded-medium bg-dark-primary/1 shadow-1 duration-medium-1 transition
    hover:bg-dark-primary/2 hover:shadow-2`,
  clickable: /* Tailwind */ tw`cursor-pointer`,
  row: /* Tailwind */ tw`flex flex-row gap-6 items-center`,
  column: /* Tailwind */ tw`inline-flex gap-4 flex-col max-w-[600px]`,
  media: /* Tailwind */ tw`rounded-medium overflow-hidden`,
  mediaRow: /* Tailwind */ tw`
    h-[80px] aspect-square
    sm:h-[80px] sm:aspect-video
    md:h-[120px]`,
  mediaColumn: /* Tailwind */ tw`min-h-[80px] max-h-[200px] aspect-video`,
  img: /* Tailwind */ tw`
    w-full h-full object-cover transition-transform duration-long-1
    group-hover/card:scale-105`,
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
  title: string;
  summery: string;
  media: string;
  direction?: 'row' | 'column';
  onClick?: () => void;
};

export type CardProps<T extends ElementType> = InternalCardProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InternalCardProps<T>>;

export const Card = <T extends ElementType = 'div'>({
  as,
  title,
  summery,
  media,
  direction = 'row',
  onClick,
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
      <div
        className={twMerge(
          styles.media,
          direction === 'row' && styles.mediaRow,
          direction === 'column' && styles.mediaColumn
        )}
      >
        <img className={styles.img} src={media} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.summery}>{summery}</div>
      </div>
    </Component>
  );
};
