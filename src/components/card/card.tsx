import clsx from 'clsx';
import { FC } from 'react';
import styles from './card.module.scss';

type CardProps = {
  title: string;
  summery: string;
  media: string;
  direction?: 'row' | 'column';
  onClick?: () => void;
};

export const Card: FC<CardProps> = ({
  title,
  summery,
  media,
  direction = 'row',
  onClick,
}) => {
  return (
    <div
      className={clsx(styles.root, {
        [styles.row]: direction === 'row',
        [styles.column]: direction === 'column',
        [styles.clickable]: onClick !== undefined,
      })}
      onClick={onClick}
    >
      <div className={styles.media}>
        <img className={styles.img} src={media} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.summery}>{summery}</div>
      </div>
    </div>
  );
};
