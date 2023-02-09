import Link from 'next/link';
import { FC } from 'react';
import { Card } from '~/components/card';
import { tw } from '~/lib/tw';
import { ProductMeta } from '~/types/parsed';

const styles = {
  root: /* Tailwind */ tw`
    grid grid-cols-1 gap-4
    sm:grid-cols-2 sm:gap-6
    lg:grid-cols-3`,
};

export type ProductListProps = {
  items: Array<ProductMeta & { slug: string }>;
};

export const ProductList: FC<ProductListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((v) => (
        <Card
          key={v.slug}
          as={Link}
          href={`/products/${v.slug}`}
          direction="column"
          title={v.title}
          summery={v.subhead}
          media={v.images[0].url}
        />
      ))}
    </div>
  );
};
