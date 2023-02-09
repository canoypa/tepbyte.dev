import { notFound } from 'next/navigation';
import { MainContents } from '~/features/main_contents';
import { MarkdownRenderer } from '~/features/markdown';
import { Info, Screenshot } from '~/features/product';
import { Tags } from '~/features/tags';
import { api } from '~/lib/api';

export const generateStaticParams = async () => {
  const products = await api.products.list();

  return products.map(({ slug }) => ({ slug }));
};

const ProductPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = await api.products.get({ slug });

  if (product === null) {
    notFound();
  }

  return (
    <MainContents>
      <Screenshot images={product.meta.images} />
      <Info product={product.meta} />
      <MarkdownRenderer tree={product.body} />
      {product.meta.tags.length > 0 && <Tags tags={product.meta.tags} />}
    </MainContents>
  );
};
export default ProductPage;
