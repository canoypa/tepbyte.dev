import { FC } from 'react'
import { StyledLink } from '~/components/styled_link'
import { css } from '~pandacss/css'

const styles = {
  root: css({
    marginX: 16,
    paddingX: 8,
    paddingY: 24,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: 'dark.outline-variant',
    color: 'dark.on-surface-variant',
    textStyle: 'body-small',
  }),
}

export const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <span>このサイトは Google Analytics を使用しています。詳しくは </span>
      <StyledLink href="https://policies.google.com/technologies/partner-sites">
        Google のサービスを使用するサイトやアプリから収集した情報の Google
        による使用
      </StyledLink>
      <span> をご覧ください。</span>
    </footer>
  )
}
