import Link from 'next/link'
import { Button } from '~/components/button'
import { MainContents } from '~/features/main_contents'
import { PageHeadline } from '~/features/page_headline'
import { css } from '~pandacss/css'
import { flex } from '~pandacss/patterns'

const styles = {
  root: flex({ direction: 'column', gap: 16 }),
  title: css({ textStyle: 'display-medium' }),
  subhead: css({ textStyle: 'body-large', color: 'dark.on-surface-variant' }),
}

export default async function NotFound() {
  return (
    <MainContents>
      <PageHeadline
        title="404 Not Found"
        subhead="There seems to be nothing here."
      />

      <span>
        <Button as={Link} href="/" label="Back to Top Page" />
      </span>
    </MainContents>
  )
}
