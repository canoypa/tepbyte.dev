import Link, { LinkProps } from 'next/link'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    color: 'dark.info',
    _hover: { textDecoration: 'underline' },
    _focusVisible: { textDecoration: 'underline' },
  }),
}

export type StyledLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps

export const StyledLinkView: ForwardRefRenderFunction<
  HTMLAnchorElement,
  StyledLinkProps
> = ({ children, ...otherProps }, ref) => {
  return (
    <Link ref={ref} className={styles.root} {...otherProps}>
      {children}
    </Link>
  )
}

export const StyledLink = forwardRef(StyledLinkView)
