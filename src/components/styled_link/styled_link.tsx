import Link, { LinkProps } from 'next/link'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { tw } from '~/lib/tw'

const styles = {
  root: /* Tailwind */ tw`
    text-dark-info hover:underline
    focus-visible:underline`,
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
