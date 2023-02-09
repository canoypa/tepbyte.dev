import { MainContents } from '~/features/main_contents';
import { PageHeadline } from '~/features/page_headline';
import { ProductList } from '~/features/product';
import { api } from '~/lib/api';

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
