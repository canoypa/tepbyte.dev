import { MdFC } from '../types';

export const Text: MdFC = ({ node }) => {
  return <>{node.value}</>;
};
