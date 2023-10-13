import Link from 'next/link'
import { Button } from '~/components/button'
import { MainContents } from '~/features/main_contents'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'

export default async function NotFound() {
  return (
    <MainContents>
      <div className={flex({ direction: 'column', gap: 16 })}>
        <h1 className={css({ textStyle: 'display-medium' })}>404 Not Found</h1>
        <p
          className={css({
            textStyle: 'body-large',
            color: 'dark.on-surface-variant',
          })}
        >
          There seems to be nothing here.
        </p>
      </div>

      <span>
        <Button as={Link} href="/" label="Back to Top Page" />
      </span>
    </MainContents>
  )
}
