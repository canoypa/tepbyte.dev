import { FC, PropsWithChildren } from 'react';
import styles from './main_contents.module.scss';

export const MainContents: FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.root}>{children}</main>;
};
