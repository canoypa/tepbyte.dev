import Link from 'next/link'
import { Button } from '~/components/button'
import { MainContents } from '~/features/main_contents'
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
      <div className={styles.root}>
        <h1 className={styles.title}>404 Not Found</h1>
        <p className={styles.subhead}>There seems to be nothing here.</p>
      </div>

      <span>
        <Button as={Link} href="/" label="Back to Top Page" />
      </span>
    </MainContents>
  )
}
