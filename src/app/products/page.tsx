import { fetchProductList } from "~/api/product";
import { MainContents } from "~/features/main_contents";
import { PageHeadline } from "~/features/page_headline";
import { ProductList } from "~/features/product";

const ProductsPage = async () => {
  const products = await fetchProductList();

  return (
    <MainContents>
      <PageHeadline>Products</PageHeadline>
      <ProductList items={products} />
    </MainContents>
  );
};
export default ProductsPage;
