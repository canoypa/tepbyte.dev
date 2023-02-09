import { tw } from '~/lib/tw';
import { MdFC } from '../types';

const styles = {
  root: /*Tailwind */ tw`underline`,
};

export const Link: MdFC = ({ node, children }) => {
  return (
    <a href={node.url} className={styles.root}>
      {children}
    </a>
  );
};
