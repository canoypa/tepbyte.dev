import { Metadata, ResolvingMetadata } from 'next';
import { MainContents } from '~/features/main_contents';
import { PageHeadline } from '~/features/page_headline';
import { ProductList } from '~/features/product';
import { api } from '~/lib/api';

type Props = {};

export async function generateMetadata(
  _: Props,
  resolvingParent: ResolvingMetadata
): Promise<Metadata> {
  const parent = await resolvingParent;

  return {
    title: 'Products',

    openGraph: {
      ...parent?.openGraph,
      title: 'Products',
      url: '/products',
    },

    alternates: {
      canonical: '/products',
    },
  };
}

export default async function () {
  const products = await api.products.list();

  if (!products) {
    throw new Error('API Error');
  }

  return (
    <MainContents>
      <PageHeadline title="Products" />
      <ProductList items={products} />
    </MainContents>
  );
}
