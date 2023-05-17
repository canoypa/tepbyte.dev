import { Metadata, ResolvingMetadata } from 'next';
import { MainContents } from '~/features/main_contents';
import { PageHeadline } from '~/features/page_headline';
import { ProductList } from '~/features/product';
import { api } from '~/lib/api';

export async function generateMetadata(
  _: unknown,
  resolvingParent?: ResolvingMetadata
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

const ProductsPage = async () => {
  const products = await api.products.list();

  return (
    <MainContents>
      <PageHeadline title="Products" />
      <ProductList items={products} />
    </MainContents>
  );
};
export default ProductsPage;
