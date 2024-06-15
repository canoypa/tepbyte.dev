import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ForwardRefRenderFunction,
} from 'react'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    color: 'dark.info',

    textDecoration: {
      _hover: 'underline',
      _focusVisible: 'underline',
    },
  }),
}

export type StyledLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const StyledLinkView: ForwardRefRenderFunction<
  HTMLAnchorElement,
  StyledLinkProps
> = ({ children, ...otherProps }, ref) => {
  return (
    <a ref={ref} className={styles.root} {...otherProps}>
      {children}
    </a>
  )
}

export const StyledLink = forwardRef(StyledLinkView)
