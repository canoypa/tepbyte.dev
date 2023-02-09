import { FC } from 'react';
import { tw } from '~/lib/tw';
import { ProductMeta } from '~/types/parsed';
import { PageHeadline } from '../page_headline';
import { Link } from './link';

const styles = {
  root: /* Tailwind */ tw`flex flex-col gap-6`,
};

export type InfoProps = {
  product: ProductMeta;
};

export const Info: FC<InfoProps> = ({ product }) => {
  return (
    <div className={styles.root}>
      <PageHeadline title={product.title} subhead={product.subhead} />
      <Link links={product.links} />
    </div>
  );
};
