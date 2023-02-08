import clsx from 'clsx';
import { MdFC } from '../types';
import styles from './heading.module.scss';

export const Heading: MdFC = ({ node, children }) => {
  const H = (
    node.depth <= 3 ? `h${node.depth}` : 'p'
  ) as keyof JSX.IntrinsicElements;

  return (
    <H
      className={clsx({
        [styles.d1]: node.depth === 1,
        [styles.d2]: node.depth === 2,
        [styles.d3]: node.depth === 3,
        [styles.d4]: node.depth === 4,
        [styles.d5]: node.depth === 5,
        [styles.d6]: node.depth === 6,
      })}
    >
      {children}
    </H>
  );
};
