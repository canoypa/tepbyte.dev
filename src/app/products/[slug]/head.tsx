import { fetchProduct } from '~/api/product';
import { AppHead } from '~/features/head';

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = await fetchProduct(slug);

  if (product === null) {
    return <AppHead notFound path={`/products/${slug}`} />;
  }

  return (
    <AppHead
      title={product.meta.title}
      description={product.meta.subhead}
      path={`/products/${slug}`}
    />
  );
};
export default Head;
