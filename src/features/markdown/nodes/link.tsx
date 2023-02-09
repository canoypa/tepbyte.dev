import { StyledLink } from '~/components/styled_link';
import { MdFC } from '../types';

export const Link: MdFC = ({ node, children }) => {
  return <StyledLink href={node.url}>{children}</StyledLink>;
};
