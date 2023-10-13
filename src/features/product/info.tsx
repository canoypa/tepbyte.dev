import { FC } from 'react'
import { ProductMeta } from '~/types/parsed'
import { flex } from '~pandacss/patterns'
import { PageHeadline } from '../page_headline'
import { Link } from './link'

const styles = {
  root: flex({ direction: 'column', gap: 24 }),
}

export type InfoProps = {
  product: ProductMeta
}

export const Info: FC<InfoProps> = ({ product }) => {
  return (
    <div className={styles.root}>
      <PageHeadline title={product.title} subhead={product.subhead} />
      <Link links={product.links} />
    </div>
  )
}
