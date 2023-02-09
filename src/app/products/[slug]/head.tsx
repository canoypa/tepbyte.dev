import { AppHead } from '~/features/head';
import { api } from '~/lib/api';

const Head = async ({ params: { slug } }: { params: { slug: string } }) => {
  const product = await api.products.get({ slug });

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
